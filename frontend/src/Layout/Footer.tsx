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
        <Grid container spacing={4}>
          <Grid  xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              TaskMaster
            </Typography>
            <Typography variant="body2" color="text.secondary">
              La soluzione completa per la gestione dei tuoi progetti e team.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Link utili
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Documentazione
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Prezzi
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Blog
                </Link>
              </li>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Supporto
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Contattaci
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="text.secondary">
                  Termini di servizio
                </Link>
              </li>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" href="#">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" href="#">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" href="#">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="#">
                <LinkedIn />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Iscriviti alla nostra newsletter per aggiornamenti.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} TaskMaster. Tutti i diritti riservati.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
