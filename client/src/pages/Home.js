import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_FULL_ME } from "../utils/queries";

import SampleForm from "../components/SampleForm";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DatasetIcon from "@mui/icons-material/Dataset";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import driver from "../assets/images/driver.png";
import { Button, Grid, Tooltip } from "@mui/material";

const Home = () => {
  const { loading, data } = useQuery(QUERY_FULL_ME);
  const loggedIn = Auth.loggedIn();
  const me = data?.me || {};
  let upcomingDeliveriesCount = 0;
  let deliveredPackages = 0;
  const boxes = data?.me.packages;

  if (data) {
    for (let i = 0; i < boxes.length; i++) {
      if (!boxes[i].expectedDelDate.startsWith("Delivered")) {
        upcomingDeliveriesCount = upcomingDeliveriesCount + 1;
      }
    }
    deliveredPackages = boxes.length - upcomingDeliveriesCount;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loggedIn && me ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          className="profile"
        >
          <Grid item>
            <h3 className="username">Welcome back {me.username}!</h3>
          </Grid>
          <Grid item>
            {deliveredPackages ? (
              <p className="delOrOut">
                You currently have {upcomingDeliveriesCount} packages scheduled
                to be delivered and {deliveredPackages} delivered!
              </p>
            ) : (
              <div>
                <p className="noPkgs">
                  You don't have any tracked packages yet!
                </p>
                <p className="noPkgs">
                  To get started, use the what to do menu at the top!
                </p>
              </div>
            )}
          </Grid>
          <Grid item>
            <img src={driver} alt="delivery driver" className="driver"></img>
          </Grid>
          <Grid container justifyContent="space-around" className="home-btns">
            <Grid item>
              <Tooltip title="Add A Package">
                <Link to={`/profile`}>
                  <AddBoxIcon sx={{ fontSize: 50, color: "#4db6ac" }} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Your Packages">
                <Link to={`/packages`}>
                  <DatasetIcon sx={{ fontSize: 50, color: "#4db6ac" }} />
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="notLoggedIn"
          spacing={1}
        >
          <Grid item>
            <h1 className="home-title"> Welcome to Is It Here Yet!</h1>
          </Grid>
          <Grid item className="example-form">
            <SampleForm />
          </Grid>
          <Grid item>
            <h2 className="intro">
              <Button variant="contained" color="secondary">
                <Link className="button-txt" to={`/signup`}>
                  Click here to get started!
                </Link>
              </Button>
            </h2>
          </Grid>
          <Grid item className="how-it-works">
            <h3>Heres how it works:</h3>
            <ol className="how-it-works-list">
              <li>
                <Link to={"/signup"}>
                  {" "}
                  <AccountBoxIcon /> Create an account
                </Link>
              </li>
              <li>
                {" "}
                <KeyboardIcon /> Enter your tracking numbers
              </li>
              <li>
                {" "}
                <LocalShippingIcon /> See when your packages will be there!
              </li>
            </ol>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
