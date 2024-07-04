import React, {useEffect, useState} from "react";
import {api} from "../utils/api";

const CSRFToken = () => {
    const [csrftoken, setCsrfToken] = useState("")

    const fetchCsrf = async () => {
        await api.get("/account/setcsrf/").then(res => {
            setCsrfToken(res?.data?.csrftoken)
            api.defaults.headers.common['X-CSRFToken'] = res?.data?.csrftoken
        })
    }

    useEffect(() => {
        fetchCsrf()
    }, []);

    return (
        <input type={"hidden"} name={"csrfmiddlewaretoken"} value={csrftoken} />
    )
}

export default CSRFToken