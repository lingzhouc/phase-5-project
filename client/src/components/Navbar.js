import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className="nav-link"
            >
                Home
            </NavLink>
            <NavLink
                to="/cards"
                className="nav-link"
            >
                Cards
            </NavLink>
            <NavLink
                to="/glossary"
                className="nav-link"
            >
                Glossary
            </NavLink>
        </nav>
    )
}

export default Navbar