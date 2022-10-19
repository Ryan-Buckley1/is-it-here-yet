import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import PackageForm from "../components/PackageForm";
import PackageList from "../components/PackageList";
import Auth from "../utils/auth";
import { QUERY_FULL_ME } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_FULL_ME);
  const loggedIn = Auth.loggedIn();

  return (
    <>
      {loggedIn && data ? (
        <div className="col-12 col-lg-3 mb-3">
          {data.me.username} has {data.me.packages.length} packages saved
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
