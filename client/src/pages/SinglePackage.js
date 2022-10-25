import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { REMOVE_PACKAGE, UPDATE_PACKAGE } from "../utils/mutations";
import { QUERY_PACKAGE } from "../utils/queries";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Button, Container, Grid, Tooltip } from "@mui/material";

import uspsPic from "../assets/images/USPS.png";
import fedexPic from "../assets/images/FEDEX.png";
import upsPic from "../assets/images/UPS.png";
import delivered from "../assets/images/delivered.png";
import onTheWay from "../assets/images/on-the-way.png";

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
      <div className="loading">
        {" "}
        <CircularProgress />
      </div>
    );
  } else {
  }
  const box = data?.package || {};
  // console.log(box.expectedDelDate.startsWith("Delivered"));
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

  let deliveredPic = null;

  let carrierPic = null;

  if (box.carrier === "UPS") {
    carrierPic = upsPic;
  }
  if (box.carrier === "Fedex") {
    carrierPic = fedexPic;
  }
  if (box.carrier === "USPS") {
    carrierPic = uspsPic;
  }
  // if (box.expectedDelDate.startsWith("Delivered")) {
  //   deliveredPic = delivered;
  // } else {
  //   deliveredPic = onTheWay;
  // }
  return (
    <>
      {queryError ? (
        <h3 className="noTracked">
          Cannot find a saved package with that tracking number!
        </h3>
      ) : (
        <Grid container justifyContent="center">
          <Grid item>
            <a href={box.urlToTracking}>
              <img
                src={carrierPic}
                alt={box.carrier}
                className="carrier-pic"
              ></img>
            </a>
          </Grid>
          <Grid container direction="column" alignItems="center">
            <h2 className={"trackingNumber"}>{box.trackingNumber}</h2>

            <div className="trackingURL">
              <div className="expDate">
                <h5>{box.expectedDelDate}</h5>
              </div>

              {UpdateLoading ? (
                <div>
                  <CircularProgress color="success" />
                </div>
              ) : (
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Tooltip title="Refresh">
                    <Button
                      className="single-pkg-btn"
                      variant="contained"
                      type="button"
                      value={box.trackingNumber}
                      onClick={handleClick}
                    >
                      <RefreshIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Package">
                    <Button
                      className="single-pkg-btn"
                      variant="contained"
                      color="error"
                      type="button"
                      value={box.trackingNumber}
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>

                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Package Deleted"
                    action={action}
                  />
                </Grid>
              )}

              {error && (
                <h3>
                  You need to be logged in!
                  {/* bad tracking number not logged in */}
                </h3>
              )}

              {error2 && (
                <h3>
                  Something went wrong while trying to delete this pacakge
                </h3>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SinglePackage;
