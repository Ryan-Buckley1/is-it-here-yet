import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PACKAGE } from "../../utils/mutations";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";

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
      setOpen(true);
      setTrackingState("");
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
    errorText = "You or someone else has already entered that Tracking Number.";
  }

  if (error && error.message.startsWith("Error:")) {
    errorText =
      "Your tracking number may have been entered incorrectly or the shipper has yet to give details.";
  }
  return (
    <div>
      <div>
        <form className="tracking-form" onSubmit={handleFormSubmit}>
          <TextField
            required
            className="trackingSubmit"
            placeholder="Tracking Number"
            name="trackingNumber"
            id="trackingNumber"
            value={trackingState}
            onChange={handleChange}
          />
          {loading ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className="submit-button"
              type="submit"
            >
              Submit
            </Button>
          )}
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Package Successfully added"
          action={action}
        />
      </div>
      <div>{error && <h3 className="error">{errorText} </h3>}</div>
    </div>
  );
};

export default PackageForm;
