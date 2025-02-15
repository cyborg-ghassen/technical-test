import {createBrowserRouter} from "react-router-dom";
import React from "react";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import Home from "../pages/home/Home";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <MainLayout/>,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    }
                ]
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "/auth/login",
                        element: <Login />
                    }
                ]
            }
        ]
    }
]
export const router = createBrowserRouter(routes, {
    basename: process.env.PUBLIC_URL,
});

export default routes;