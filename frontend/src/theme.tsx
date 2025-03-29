import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme :ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
  
  },
});

export default theme;
