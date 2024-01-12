import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client"

import CreditCardList from "./components/creditCards/CreditCardList"
import CreditCardInfo from "./components/creditCards/CreditCardInfo"
import ReviewList from "./components/reviews/ReviewList";
import Glossary from "./components/glossary/Glossary"
import LogInForm from "./components/auth/LogInForm"
import SignUpForm from "./components/auth/SignUpForm"

import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/cards",
                element: <CreditCardList />
            },
            {   
                path: "/cards/:id",
                element: <CreditCardInfo />
            },
            {
                path: "/cards/:id/reviews",
                element: <ReviewList />
            },
            {
                path: "/glossary",
                element: <Glossary />
            },
            {
                path: "/login",
                element: <LogInForm />
            },
            {
                path: "/signup",
                element: <SignUpForm />
            }          
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
);
