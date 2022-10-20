import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PACKAGE } from "../utils/mutations";
import PackageForm from "../components/PackageForm";

const Profile = () => {
  return (
    <>
      <div> THis is the profile page</div>
      <PackageForm />
      <Link to={`/profile/packages`}>See all of your tracked packages</Link>
    </>
  );
};

export default Profile;
