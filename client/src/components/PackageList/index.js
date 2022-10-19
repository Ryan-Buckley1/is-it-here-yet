import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UPDATE_PACKAGE } from "../../utils/mutations";
import { QUERY_FULL_ME } from "../../utils/queries";

const PackageList = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const { loading, data } = useQuery(QUERY_FULL_ME);

  const [updatePackageInfo, { error }] = useMutation(UPDATE_PACKAGE, {
    variables: trackingNumber,
  });
  if (!data.me.packages.length) {
    return <h2>No Packages Tracked Yet</h2>;
  }
  const handleClick = (event) => {
    event.preventDefault();
    setTrackingNumber(event.target.value);
    try {
      updatePackageInfo(trackingNumber);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3> Your Packages!</h3>
      {data.me.packages &&
        data.me.packages.map((stuff) => (
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
              <button
                type="button"
                value={stuff.trackingNumber}
                onClick={handleClick}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PackageList;
