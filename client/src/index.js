import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client"

import CreditCardList from "./components/creditCards/CreditCardList"
import Glossary from "./components/glossary/Glossary"
import {createBrowserRouter, RouterProvider} from "react-router-dom"



const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/cards",
                element: <CreditCardList />,
            },
            {
                path: "/glossary",
                element: <Glossary />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
);
