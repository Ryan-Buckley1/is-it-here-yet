import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <div>That page doesn't exist!</div>
      <Link to={"/"}>Return Home</Link>
    </div>
  );
};
export default NoMatch;
