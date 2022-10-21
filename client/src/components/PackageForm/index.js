import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PACKAGE } from "../../utils/mutations";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const PackageForm = () => {
  const [trackingState, setTrackingState] = useState("");
  const [open, setOpen] = useState(false);

  const [addPackage, { error, loading }] = useMutation(ADD_PACKAGE, {
    variables: { trackingNumber: trackingState },
  });

  const handleChange = (event) => {
    const trackingNumber = event.target.value;
    setTrackingState(trackingNumber);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPackage();
      setTrackingState("");
      setOpen(true);
    } catch (e) {
      console.error(e);
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

  let errorText = "";
  if (error && error.message.startsWith("E11000")) {
    errorText = "You already entered that Tracking Number.";
  }

  if (error && error.message.startsWith("Error:")) {
    errorText = "Your tracking number may have been entered incorrectly";
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="trackingSubmit"
          placeholder="Tracking Number"
          name="trackingNumber"
          id="trackingNumber"
          value={trackingState}
          onChange={handleChange}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <button className="btn d-block w-100" type="submit">
            Submit
          </button>
        )}
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Package Successfully added"
        action={action}
      />

      {error && <h1>{errorText} </h1>}
    </div>
  );
};

export default PackageForm;
