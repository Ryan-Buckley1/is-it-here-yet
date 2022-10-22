import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import PackageForm from "../components/PackageForm";
import PackageList from "./PackageList";
import Auth from "../utils/auth";
import { QUERY_FULL_ME } from "../utils/queries";

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
        <div className="profile">
          <h3 className="usename">Welcome back {me.username}!</h3>
          <p className="packageCount">
            You currently have {me.packageCount} packages saved
          </p>
          <p>
            You currently have {upcomingDeliveriesCount} scheduled to be
            delivered and {deliveredPackages} delivered!
          </p>
          <Link to={`/profile/packages`}>See your packages!</Link>
        </div>
      ) : (
        <div>
          <h2> Welcome to Is it here Yet!</h2>
          <p>
            You can use this app to keep track of all of your UPS, Fedex, and
            USPS packages!{" "}
          </p>
          <br />
          <p>
            To use it, please sign up or log in and enter a tracking number and
            we will display all of the information you will need to know when it
            will be there!
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
