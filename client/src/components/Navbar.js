import { NavLink } from "react-router-dom"
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#ffffffff", // Set the background color to a color of your choice
    color: "#000000", // Set the text color to a color of your choice
});

const StyledNavLink = styled(NavLink)({
    color: "#000000", // Set the link color to a color of your choice
    textDecoration: "none",
    margin: "0 15px",
});
  
function Navbar() {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledNavLink to="/">
                    <Button color="inherit">Home</Button>
                </StyledNavLink>
                <StyledNavLink to="/cards">
                    <Button color="inherit">Cards</Button>
                </StyledNavLink>
                <StyledNavLink to="/glossary">
                    <Button color="inherit">Glossary</Button>
                </StyledNavLink>
            </Toolbar>
        </StyledAppBar>
    );
  }

export default Navbar