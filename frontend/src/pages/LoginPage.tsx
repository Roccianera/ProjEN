import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import styled from "@mui/system/styled";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  backgroundColor: theme.palette.background.default,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: (theme.shadows as string[])[3],
  minWidth: 300,
  textAlign: "center",
}));

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  

  const validateForm = (): boolean => {
    if (!username) {
      setError("Username is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    setError(""); // Clear any previous errors
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("Logging in user:", { username, password });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.text.primary}
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: theme.spacing(2) }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            placeholder="Enter your username"
            sx={{ marginBottom: theme.spacing(2) }}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            placeholder="Enter your password"
            sx={{ marginBottom: theme.spacing(2) }}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ marginTop: theme.spacing(2) }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </StyledCard>
    </StyledContainer>
  );
}

export default LoginPage;
