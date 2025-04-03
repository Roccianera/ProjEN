import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider,
  IconButton
} from "@mui/material";
import Grid from "@mui/material/GridLegacy"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn 
} from "@mui/icons-material";

//Change GridLegacy


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[200] 
            : theme.palette.grey[800],
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} TaskMaster. Tutti i diritti riservati.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
