import os
import re

import pandas as pd
from groq import Groq

from post.models import Post


def process_file(file):
    df = pd.read_csv(file.file_url)
    return df


def connect_client():
    groq_api_key = os.environ.get("GROQ_API_KEY")
    client = Groq(api_key=groq_api_key)
    return client


def categorize_text(text):
    client = connect_client()
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "user",
                "content": "Categorize as store name, retailers_names, industry, city or country, number of stores, relevant or not and summarize in about 15 words this text " + text
            },
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )

    return completion.choices[0].message.content


def extract_fields(text):
    fields = dict()
    try:
        fields['Store name'] = re.search(r'\* Store name: (.+)', text).group(1)
    except AttributeError:
        fields['Store name'] = "Not mentioned"

    try:
        fields['retailers_names'] = re.search(r'\* Retailers_names: (.+)', text).group(1)
    except AttributeError:
        fields['retailers_names'] = "Not mentioned"

    try:
        fields['retailer_industry'] = re.search(r'\* Industry: (.+)', text).group(1)
    except AttributeError:
        fields['retailer_industry'] = "Not mentioned"

    try:
        fields['country_of_opening'] = re.search(r'\* City or Country: (.+)', text).group(1)
    except AttributeError:
        fields['country_of_opening'] = "Not mentioned"

    try:
        fields['number_of_stores'] = int(re.search(r'\* Number of stores: (.+)', text).group(1)[0])
    except (AttributeError, ValueError):
        fields['number_of_stores'] = 0

    try:
        relevant_text = re.search(r'\* Relevant or not: (.+)', text).group(1)
        fields['is_relevant'] = 'relevant' in relevant_text.lower() or 'yes' in relevant_text.lower()
    except AttributeError:
        fields['is_relevant'] = False

    try:
        fields['summary_eng'] = re.search(r'\* Summary: (.+)', text).group(1)
    except AttributeError:
        fields['summary_eng'] = "Not mentioned"

    return fields


def run_model(file):
    df = process_file(file)
    for index, row in df.iterrows():
        output = categorize_text(row['textcontent'])
        fields = extract_fields(output)
        Post.objects.create(
            is_relevant=fields['is_relevant'],
            retailers_names=fields['retailers_names'],
            retailer_industry=fields['retailer_industry'],
            country_of_opening=fields['country_of_opening'],
            number_of_stores=fields['number_of_stores'],
            summary_eng=fields['summary_eng'],
        )
