import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { REMOVE_PACKAGE, UPDATE_PACKAGE } from "../utils/mutations";
import { QUERY_PACKAGE } from "../utils/queries";

const SinglePackage = () => {
  const { trackingNumber } = useParams();
  console.log(trackingNumber);
  const {
    loading: UpdateLoading,
    data,
    error: queryError,
  } = useQuery(QUERY_PACKAGE, {
    variables: { trackingNumber: trackingNumber },
  });

  const [updatePackageInfo, { loading, error }] = useMutation(UPDATE_PACKAGE, {
    variables: { trackingNumber: trackingNumber },
  });

  const [deletePackage, { error: error2 }] = useMutation(REMOVE_PACKAGE, {
    variables: { trackingNumber: trackingNumber },
  });

  if (loading) {
    return <div> Loading...</div>;
  }

  const box = data?.package || {};

  console.log("data", queryError);

  const handleClick = (event) => {
    event.preventDefault();
    try {
      updatePackageInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    try {
      deletePackage();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {queryError ? (
        <h3>Cannot find a saved package with that tracking number!</h3>
      ) : (
        <div>
          <h3 className="title">{box.trackingNumber}</h3>
          <div className="trackingURL">
            <p>
              <a href={box.urlToTracking}>{box.carrier}</a>
            </p>

            <div className="expDate">
              <p>{box.expectedDelDate}</p>
            </div>

            {UpdateLoading ? (
              <div> Loading... </div>
            ) : (
              <div>
                <button
                  type="button"
                  value={box.trackingNumber}
                  onClick={handleClick}
                >
                  {" "}
                  Update tracking{" "}
                </button>

                <button
                  type="button"
                  value={box.trackingNumber}
                  onClick={handleDelete}
                >
                  {" "}
                  Delete Package{" "}
                </button>
              </div>
            )}

            {error && (
              <h3>
                {" "}
                Something went wrong while trying to update your package details
                {/* bad tracking number not logged in */}
              </h3>
            )}

            {error2 && (
              <h3>Something went wrong while trying to delete this pacakge</h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePackage;
