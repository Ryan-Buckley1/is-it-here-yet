import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import PackageForm from "../components/PackageForm";
import PackageList from "./PackageList";
import Auth from "../utils/auth";
import { QUERY_FULL_ME } from "../utils/queries";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DatasetIcon from "@mui/icons-material/Dataset";

import delTrucks from "../assets/images/delivery-trucks.webp";
import driver from "../assets/images/driver.png";
import { Grid, Tooltip } from "@mui/material";

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
                <Link to={`/profile/packages`}>
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
        >
          <Grid item>
            <h2> Welcome to Is It Here Yet!</h2>
          </Grid>
          <Grid item className="box-pic-cont">
            <img
              src={delTrucks}
              className="boxes-pic"
              alt="Bunch of boxes"
            ></img>
          </Grid>
          <Grid item>
            <p className="intro">
              You can use this app to keep track of all of your UPS, Fedex, and
              USPS packages!{" "}
            </p>
          </Grid>
          <Grid item>
            <p className="intro">
              Instead of going to each site to see when it will get delivered,
              why not let us do it for you?!
            </p>
          </Grid>
          <Grid item>
            <p className="intro">
              To use it, please sign up or log in and enter a tracking number
              and we will display all of the information you will need to know
              when it will be there!
            </p>
          </Grid>
          <Grid item>
            <p className="intro">
              <Link to={`/signup`}> Click here to get started!</Link>
            </p>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
