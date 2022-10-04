import React, { useEffect } from "react";
import { getUserProfile, setUserProfile } from "./api/mock-api";
import { Routes, Route, Navigate } from "react-router-dom";
import { EditProfile } from "./features/editProfile/EditProfile";
import { Navbar } from "./components/Navbar";
import { APP_URL } from "./constants";
import ProfileView from "./features/profileView/ProfileView";

const App = () => {
  useEffect(() => {
    getUserProfile();
  });
  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        flexDirection: "column",
        gridGap: 10,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Navbar />
      <Routes>
        <Route
          path={APP_URL.user.edit}
          element={
            <EditProfile
              getProfile={getUserProfile}
              updateProfile={setUserProfile}
            />
          }
        />
        <Route
          path={APP_URL.user.preview}
          element={
            <ProfileView
              getProfile={getUserProfile}
              updateProfile={setUserProfile}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={APP_URL.user.preview} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
