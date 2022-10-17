import React, { useState } from "react";
import { fedexScraper } from "../../../../server/utils/scraper";

const PackageForm = () => {
  const [trackingState, setTrackingState] = useState("");

  const handleChange = (event) => {
    const trackingNumber = event.target.value;
    setTrackingState(trackingNumber);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await fedexScraper(trackingState);
      return data;
    } catch (e) {
      console.log(e);
    }
    setTrackingState("");
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
    </div>
  );
};

export default PackageForm;
