import React from "react";
import ReactDOM from "react-dom/client"; // Use the new createRoot API
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#03dac5",
    },
  },
});

const rootElement = document.getElementById("root");

// Create the root for React 18
const root = ReactDOM.createRoot(rootElement);

// Render the App component wrapped in ThemeProvider
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
