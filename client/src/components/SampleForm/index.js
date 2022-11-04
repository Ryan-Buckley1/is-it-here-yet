import React, { useState } from "react";

import { Button, TextField } from "@mui/material";

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
          <TextField
            required
            className="trackingSubmit"
            placeholder="Tracking Number"
            name="trackingNumber"
            id="trackingNumber"
            value={trackingState}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            className="submit-button"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
      <div>{errorText && <h3 className="error">{errorText} </h3>}</div>
    </div>
  );
};

export default SampleForm;
