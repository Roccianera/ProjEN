import React from "react";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";

const Layout = ({ children }: { children: React.ReactNode }) => {

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1  }} minHeight={"70vh"} borderColor={theme.palette.background.paper} borderBottom={1} borderTop={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
