import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { APP_URL } from "../constants";
export const Navbar = () => {
  const location = useLocation();

  const isCurrentlyShowingPreview = React.useMemo(
    () => location.pathname === APP_URL.user.preview,
    [location.pathname]
  );

  return (
    <Box display="grid" mt={5} gridTemplateColumns="auto auto">
      <Button
        variant="contained"
        style={{
          backgroundColor: !isCurrentlyShowingPreview ? "pink" : undefined,
        }}
      >
        <Link to={"/edit"} style={{ textDecoration: "none", color: "lime" }}>
          Edit profile
        </Link>
      </Button>

      <Button
        variant="contained"
        style={{
          backgroundColor: isCurrentlyShowingPreview ? "pink" : undefined,
        }}
      >
        <Link
          to={"/preview"}
          style={{ textDecoration: "none", color: "orange" }}
        >
          Profile preview{" "}
        </Link>
      </Button>
    </Box>
  );
};
