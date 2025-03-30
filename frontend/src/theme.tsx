// theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      light: "#000000",
    },
    secondary: {
      main: "#f50057",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.2)",
    "0px 1px 5px rgba(0, 0, 0, 0.2)",
    "12px 12px 2px 1px rgba(0, 0, 0, 0.27)",
    "0px 1px 15px rgba(0, 0, 0, 0.2)",
    "0px 1px 20px rgba(0, 0, 0, 0.2)",
    "none", "none", "none", "none", "none", "none", "none", "none", "none", "none",
    "none", "none", "none", "none", "none", "none", "none", "none", "none",
  ],
  
});
