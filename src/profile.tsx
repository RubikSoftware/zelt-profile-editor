import React, { useState } from "react";
import { Profile } from "./api/mock-api";

type Props = {
  /**
   * Retrieve the user's current profile
   */
  getProfile: () => Promise<Profile>;
  /**
   * Update the user's profile
   */
  updateProfile: (newProfile: Profile) => Promise<"OK" | Error>;
};

/**
 * The user's profile view.
 * It should be possible for the user to see (and edit) their own information.
 */
function ProfileView({ getProfile }: Props) {
  const [profile, setProfile] = useState<Profile>();

  getProfile().then(setProfile);

  return (
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
      <p>
        Name: {profile?.firstName} {profile?.lastName}
      </p>
      <p>DoB: {profile?.dob}</p>
      <p>Salary: {profile?.salary}</p>
    </div>
  );
}

export default ProfileView;
