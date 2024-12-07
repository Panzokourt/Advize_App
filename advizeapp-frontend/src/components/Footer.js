import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#6200ea",
        color: "#fff",
        textAlign: "center",
        padding: "8px",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} AdvizeApp. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
