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
  height: "100vh",
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
  boxShadow: theme.shadows[3],
  minWidth: 300,
  textAlign: "center",
}));

function RegisterPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!username) {
      setError("Username is required.");
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("A valid email is required.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(""); // Clear any previous errors
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("Registering user:", { username, email, password });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
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
          Register
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
          onSubmit={handleRegister}
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
            label="Email"
            variant="outlined"
            fullWidth
            placeholder="Enter your email"
            sx={{ marginBottom: theme.spacing(2) }}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
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

export default RegisterPage;
