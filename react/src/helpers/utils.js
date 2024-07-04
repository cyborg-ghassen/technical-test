import {format, parseISO} from 'date-fns';
import {useContext} from "react";
import AppContext from "../context/Context";

export const formatDateTime = datetime => {
    if (!datetime) {
        return '';
    }
    try {
        return format(parseISO(datetime), 'MMM dd, yyyy HH:mm');
    } catch {
        return '';
    }
};

export const getItemFromStore = (key, defaultValue, store = localStorage) => {
    try {
        return store.getItem(key) === null
            ? defaultValue
            : JSON.parse(store.getItem(key));
    } catch {
        return store.getItem(key) || defaultValue;
    }
};

export const setItemToStore = (key, payload, store = localStorage) =>
    store.setItem(key, payload);

export const getStoreSpace = (store = localStorage) =>
    parseFloat(
        (
            escape(encodeURIComponent(JSON.stringify(store))).length /
            (1024 * 1024)
        ).toFixed(2)
    );

//===============================
// Cookie
//===============================
export const getCookieValue = name => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
};

export const useAppContext = () => useContext(AppContext)