import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1, position: "relative" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "24px",
            backgroundColor: "#f5f5f5",
            marginTop: "64px", // Adjust for Header height
            minHeight: "calc(100vh - 128px)", // Adjust for Header + Footer height
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
