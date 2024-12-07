import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#37474f" },
    secondary: { main: "#607d8b" },
    background: { default: "#eceff1", paper: "#ffffff" },
  },
  typography: { fontFamily: "'Roboto', sans-serif" },
});

export default theme;
