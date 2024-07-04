from django.db import models


# Create your models here.
class Post(models.Model):
    is_relevant = models.BooleanField()
    retailers_names = models.CharField(max_length=255)
    retailer_industry = models.CharField(max_length=255)
    country_of_opening = models.CharField(max_length=255)
    number_of_stores = models.IntegerField()
    summary_eng = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
