import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import InsightsIcon from "@mui/icons-material/Insights";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundImage: "linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
  color: theme.palette.common.white,
  textAlign: "center",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(6),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  borderRadius: "50%",
  padding: theme.spacing(2),
  display: "inline-flex",
  marginBottom: theme.spacing(2),
}));

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Manage your projects with TaskMaster
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}
        >
          The complete solution for teams and managers who want to organize,
          track, and complete projects efficiently
        </Typography>
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
            sx={{ mr: 2, px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            onClick={() =>
              navigate(isAuthenticated ? "/projects/new" : "/register")
            }
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            {isAuthenticated ? "New Project" : "Sign Up"}
          </Button>
        </Box>
      </HeroSection>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconWrapper>
                  <AssignmentIcon fontSize="large" color="primary" />
                </IconWrapper>
                <Typography variant="h5" component="h3" gutterBottom>
                  Task Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Organize your projects into tasks and categories. Monitor
                  progress and assign priorities to stay on track.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconWrapper>
                  <GroupIcon fontSize="large" color="primary" />
                </IconWrapper>
                <Typography variant="h5" component="h3" gutterBottom>
                  Collaboration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Work together with your team in real time. Share projects,
                  assign tasks, and communicate effectively within the platform.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconWrapper>
                  <InsightsIcon fontSize="large" color="primary" />
                </IconWrapper>
                <Typography variant="h5" component="h3" gutterBottom>
                  Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  View detailed statistics and reports on project progress and
                  team performance. Make decisions based on concrete data.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.background.paper})`
              : `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.background.paper})`,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" component="h2" fontWeight="bold">
            Ready to take your projects to the next level?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
            Join thousands of teams that have improved their productivity with
            TaskMaster. Start for free and discover how we can help you achieve
            your goals.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              navigate(isAuthenticated ? "/dashboard" : "/register")
            }
            sx={{ mt: 2, px: 4, py: 1.5 }}
          >
            {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default HomePage;
