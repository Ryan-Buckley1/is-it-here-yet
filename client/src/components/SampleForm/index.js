import React, { useState } from "react";

import { Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SampleForm = () => {
  const [trackingState, setTrackingState] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    const trackingNumber = event.target.value;
    setTrackingState(trackingNumber);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorText("Oh No! You need to be logged in to use the tracker!");
      setTrackingState("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="sample-form">
      <div>
        <form className="sample-tracking-form" onSubmit={handleFormSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TextField
                required
                className="sampleTrackingSubmit"
                placeholder="Tracking Number"
                name="trackingNumber"
                id="trackingNumber"
                value={trackingState}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className="submit-button"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        {errorText && (
          <h3 className="error">
            <Link to={"/signup"}>{errorText}</Link>{" "}
          </h3>
        )}
      </div>
    </div>
  );
};

export default SampleForm;
