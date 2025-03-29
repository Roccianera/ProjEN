import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeOptions, ThemeProvider } from '@mui/material'

import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'





const theme :ThemeOptions= createTheme({
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
});








createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <ThemeProvider theme={theme}>
     <CssBaseline />
    <App />

    </ThemeProvider>
  </BrowserRouter>
)
