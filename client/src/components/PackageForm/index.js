import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PACKAGE } from "../../utils/mutations";

const PackageForm = () => {
  const [trackingState, setTrackingState] = useState("");
  const [addPackage, { error }] = useMutation(ADD_PACKAGE, {
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
    } catch (e) {
      console.error(e);
    }
  };
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
        <button className="btn d-block w-100" type="submit">
          Submit
        </button>
      </form>
      {error && <h1>Something Went wrong! </h1>}
    </div>
  );
};

export default PackageForm;
