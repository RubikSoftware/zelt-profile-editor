import React, { useEffect } from "react";
import { getUserProfile, setUserProfile } from "./api/mock-api";
import ProfileView from "./profile";

function App() {
  useEffect(() => {
    getUserProfile();
  });
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProfileView getProfile={getUserProfile} updateProfile={setUserProfile} />
    </div>
  );
}

export default App;
