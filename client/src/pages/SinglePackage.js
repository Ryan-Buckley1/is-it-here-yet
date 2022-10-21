import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { REMOVE_PACKAGE, UPDATE_PACKAGE } from "../utils/mutations";
import { QUERY_PACKAGE } from "../utils/queries";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SinglePackage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { trackingNumber } = useParams();
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
    return (
      <div>
        {" "}
        <CircularProgress />
      </div>
    );
  }
  const box = data?.package || {};

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
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
              <div>
                <CircularProgress color="success" />
              </div>
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
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="Package Deleted"
                  action={action}
                />
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
