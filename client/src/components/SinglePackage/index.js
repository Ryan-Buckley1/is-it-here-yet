import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import { UPDATE_PACKAGE } from "../../utils/mutations";
import { QUERY_PACKAGE } from "../../utils/queries";

const SinglePackage = () => {
  const { trackingNumber: trackingNumber } = useParams();

  const { loading, data } = useQuery(QUERY_PACKAGE, {
    variables: { trackingNumber: trackingNumber },
  });

  const [updatePackageInfo, { error }] = useMutation(UPDATE_PACKAGE);
  if (loading) {
    return <div> Loading...</div>;
  }
  const handleClick = (event) => {
    event.preventDefault();
    try {
      updatePackageInfo();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3 className="title">{trackingNumber}</h3>
      <div className="trackingURL">
        <p>
          <a href={urlToTracking}>{carrier}</a>
        </p>
        <div className="expDate">
          <p>{expectedDelDate}</p>
        </div>

        {Auth.loggedIn() && (
          <button type="button" value={trackingNumber} onClick={handleClick} />
        )}
        {error && (
          <h3>
            {" "}
            Something went wrong while trying to update your package details
          </h3>
        )}
      </div>
    </>
  );
};

export default SinglePackage;
