import React from "react";
import { Link } from "react-router-dom";

const PackageList = ({ packages }) => {
  if (!packages.length) {
    return <h2>No Packages Tracked Yet</h2>;
  }
};
