import React from "react";
import { AppBar, Toolbar, Typography, } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#6200ea" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AdvizeApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
