import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Card, TextField } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default, // Usa il background del tema
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  minWidth: 300, // Per evitare che sia troppo piccolo
  textAlign: 'center', // Per allineare il testo
}));

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [password,setPassword]=React.useState<string>("");
  const [username,setUsername]=React.useState<string>("");
  const [error,setError]=React.useState<string>("");
  const [loading,setLoading]=React.useState<boolean>(false);


  const handleLogin = async () => {
    console.log("Login clicked",username,password);



  }












  return (
    <StyledContainer>
      <StyledCard>
        <Typography variant="h4" gutterBottom color={theme.palette.text.primary}>
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin} >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            placeholder="Enter your username"
            sx={{ marginBottom: theme.spacing(2) }}
            onChange={(e)=>setUsername(e.target.value)}
            ></TextField>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            placeholder="Enter your password"
            onChange={(e)=>setPassword(e.target.value)}
            ></TextField>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: theme.spacing(2) }}
          >Sumbit</Button>

        </Box>
      </StyledCard>
    </StyledContainer>
  );
}

export default LoginPage;
