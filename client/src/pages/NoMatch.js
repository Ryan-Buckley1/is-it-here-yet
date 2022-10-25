import React from "react";
import { Link } from "react-router-dom";
import lost from "../assets/images/lost.png";

const NoMatch = () => {
  return (
    <div className="lost-page">
      <h1>That page doesn't exist! </h1>
      <img id="lost" src={lost} alt="lost"></img>
      <Link to={"/"}>Return Home</Link>
    </div>
  );
};
export default NoMatch;
