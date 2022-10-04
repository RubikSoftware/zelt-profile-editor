import React from "react";
import { Profile } from "../../api/mock-api";

import { Avatar } from "@mui/material";

import { CircularProgress } from "@mui/material";
type Props = {
  getProfile: () => Promise<Profile>;
  updateProfile: (newProfile: Profile) => Promise<"OK" | Error>;
};

function ProfileView({ getProfile }: Props) {
  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [profile, setProfile] = React.useState<Profile>();

  React.useEffect(() => {
    getProfile().then((initialProfile) => {
      setProfile(initialProfile);
      setLoadingProfile(false);
    });
  });

  return (
    <>
      {loadingProfile ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <h1>Your Zelt Profile</h1>
          {profile?.profilePictureURL && (
            <Avatar
              style={{ width: 100, height: 100 }}
              src={profile?.profilePictureURL}
              variant="circular"
            />
          )}
          <p>
            Name: {profile?.firstName} {profile?.lastName}
          </p>
          <p>DoB: {profile?.dob}</p>
          <p>Salary: {profile?.salary}</p>
          <p>City: {profile?.city}</p>
        </div>
      )}
    </>
  );
}

export default ProfileView;
