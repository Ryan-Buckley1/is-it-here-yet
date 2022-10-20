import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UPDATE_PACKAGE } from "../utils/mutations";
import { QUERY_FULL_ME } from "../utils/queries";

const PackageList = () => {
  const { loading, data } = useQuery(QUERY_FULL_ME);
  console.log(data);

  // if (!data.me.packages.length) {
  //   return <h2>No Packages Tracked Yet</h2>;
  // }
  const me = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3> Your Packages!</h3>
      {me.packages &&
        me.packages.map((stuff) => (
          <div key={stuff.trackingNumber} className="package-card">
            <p className="card-header">
              <Link to={`/profile/package/${stuff.trackingNumber}`}>
                {stuff.trackingNumber}
              </Link>
            </p>

            <div className="card-body">
              <p>
                <a href={stuff.urlToTracking}>{stuff.carrier}</a>
              </p>
              <p>{stuff.expectedDelDate}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PackageList;
