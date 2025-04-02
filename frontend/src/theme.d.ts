import { ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {

    palette: {
      mode: string;
      primary: {
        main: string;
        light: string;
      }
      secondary: {
        main: string;
      }
    };
    typography: {
      fontFamily: string;
      fontSize: number;
      fontWeightRegular: number;
      fontWeightMedium: number;
      fontWeightBold: number;
    };
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
    zIndex: {
      appBar: number;
      drawer: number;
      modal: number;
    };
    spacing: (factor: number) => string;
    shape: {
      borderRadius: number;
    };
    shadows: string[];
    
    status: {
      danger: string;
    };
  }
  
  // Allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    spacing?: (factor: number) => string;
    shape?: {
      borderRadius?: number;
    };
    
  }

  
}
