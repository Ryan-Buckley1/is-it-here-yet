import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PACKAGE } from "../utils/mutations";
import PackageForm from "../components/PackageForm";

const Profile = () => {
  return (
    <>
      <div> THis is the profile page</div>
      <PackageForm />
    </>
  );
};

export default Profile;
