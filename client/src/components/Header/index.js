import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddPackage = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleAllPackage = () => {
    navigate("/packages");
    setAnchorEl(null);
  };

  const handleLogIn = () => {
    navigate("/login");
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    navigate("/signup");
    setAnchorEl(null);
  };

  return (
    <>
      {loggedIn ? (
        <header className="header">
          <div className="header-bar">
            <Link to="/">
              <h1 className="title">Is It Here Yet?</h1>
            </Link>
            <nav className="what-to-do">
              <Button
                color="primary"
                variant="contained"
                id="menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                What to do
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleAddPackage}>Add A package</MenuItem>
                <MenuItem onClick={handleAllPackage}>See All Packages</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </nav>{" "}
          </div>{" "}
        </header>
      ) : (
        <header className="header-not-loggedin">
          <div className="header-bar">
            <Link to={"/"}>
              <h1 className="title"> Is It Here Yet?</h1>
            </Link>

            <nav className="what-to-do">
              <Button
                color="primary"
                variant="contained"
                id="menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                What to do
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogIn}>Login</MenuItem>
                <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>
              </Menu>
            </nav>
          </div>
          <div className="header-box">
            <div className="header-info">
              <h2>Wondering where your package is?</h2>
              <h4>
                We can make it easier for you! We can keep all of your tracking
                numbers in one easy place!
              </h4>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
