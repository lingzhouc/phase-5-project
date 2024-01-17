import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { CssBaseline } from "@mui/material";

function Layout() {

    const [allCardItems, setAllCardItems] = useState([])

    useEffect(() => {
        fetch("/cards")
            .then((resp) => resp.json())
            .then(setAllCardItems)
    }, []);

    const context = {
        allCardItems
    }

    return (
        <div> 
            <CssBaseline />
            <Header />
            <Navbar />
            <Outlet context={context} />
            <Footer />
        </div>
    )
}

export default Layout