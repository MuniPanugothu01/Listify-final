import React from "react";
import ProfileOverview from "./ProfileOverview";

const ProfileMain = ({ user, profilePic }) => {
  return <ProfileOverview user={user} profilePic={profilePic} />;
};

export default ProfileMain;