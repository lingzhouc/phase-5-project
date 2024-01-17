import { NavLink } from "react-router-dom"
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";
import "../styling/nav.css"

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#cfcfcf", // Set the background color to a color of your choice
    color: "#000000", // Set the text color to a color of your choice
});

const StyledNavLink = styled(NavLink)({
    color: "#000000", // Set the link color to a color of your choice
    textDecoration: "none",
    margin: "0 15px"
});
  
function Navbar() {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledNavLink to="/">
                    <Button className="nav-btn" color="inherit">Home</Button>
                </StyledNavLink>
                <StyledNavLink to="/cards">
                    <Button className="nav-btn" color="inherit">Cards</Button>
                </StyledNavLink>
                <StyledNavLink to="/glossary">
                    <Button className="nav-btn" color="inherit">Glossary</Button>
                </StyledNavLink>
            </Toolbar>
        </StyledAppBar>
    );
  }

export default Navbar