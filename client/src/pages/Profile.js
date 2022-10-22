import React from "react";

import PackageForm from "../components/PackageForm";

const Profile = () => {
  return (
    <>
      <div className="profile-page">
        <div> Enter in a tracking number to track your package!</div>
        <PackageForm />
      </div>
    </>
  );
};

export default Profile;
