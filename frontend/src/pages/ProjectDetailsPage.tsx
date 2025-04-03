import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectDetails } from "../type/type";
import { useState } from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
  Tabs,
  Tab,
  Divider,
  Chip,
  Paper,
  Button,
} from "@mui/material";

import Grid from "@mui/material/GridLegacy";
import { getProjectById } from "../service/projectService";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import TaskList from "../components/TaskList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import { useShouldFetch } from "../hooks/shouldFetch";

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const theme = useTheme();
  const {shouldFetch, setShouldFetch} = useShouldFetch();

  
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const projectData = await getProjectById(Number(id));
        setProject(projectData);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id,shouldFetch]);

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveCategory(newValue);
  };

  // Show loading indicator
  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Show error message
  if (error || !project) {
    return (
      <Container>
        <Alert severity="error">{error || "Project not found"}</Alert>
      </Container>
    );
  }

  // Calculate project stats
  const totalTasks = project.taskCategories
    ? project.taskCategories.reduce(
        (sum, category) => sum + category.tasks.length,
        0
      )
    : 0;

  const completedTasks = project.taskCategories
    ? project.taskCategories.reduce(
        (sum, category) =>
          sum + category.tasks.filter((task) => task.isCompleted).length,
        0
      )
    : 0;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const daysUntilDue = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Render project details
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Project Header */}
      <StyledCard elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {project.description}
            </Typography>

            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Start: ${new Date(
                  project.startDate
                ).toLocaleDateString()}`}
                variant="outlined"
              />
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Due: ${new Date(project.endDate).toLocaleDateString()}`}
                color={
                  daysUntilDue < 0
                    ? "error"
                    : daysUntilDue < 7
                    ? "warning"
                    : "default"
                }
                variant="outlined"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledStatsCard>
              <Typography variant="h6" align="center" gutterBottom>
                Project Progress
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={80}
                  thickness={5}
                  sx={{
                    color:
                      progress >= 100
                        ? theme.palette.success.main
                        : progress >= 60
                        ? theme.palette.info.main
                        : theme.palette.warning.main,
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                  >
                    {`${progress}%`}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    {completedTasks}
                  </Box>{" "}
                  of {totalTasks} tasks completed
                </Typography>
                <Typography
                  variant="body2"
                  color={daysUntilDue < 0 ? "error.main" : "text.secondary"}
                >
                  {daysUntilDue < 0
                    ? `Overdue by ${Math.abs(daysUntilDue)} days`
                    : daysUntilDue === 0
                    ? "Due today"
                    : `${daysUntilDue} days left`}
                </Typography>
              </Box>
            </StyledStatsCard>
          </Grid>
        </Grid>
      </StyledCard>

      {/* Task Categories Tabs */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <AssignmentIcon fontSize="large" /> Tasks by Category
        </Typography>

        {project.taskCategories && project.taskCategories.length > 0 ? (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {project.taskCategories.map((category, index) => (
                <Tab
                  key={category.id}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {category.name}
                      <Chip
                        size="small"
                        label={category.tasks.length}
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                  id={`tab-${index}`}
                  aria-controls={`tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>
        ) : (
          <Alert severity="info">
            No task categories available for this project.
          </Alert>
        )}
      </Box>

      {/* Active Category Tasks */}
      {project.taskCategories && project.taskCategories.length > 0 && (
        <Box
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          sx={{ mt: 3, px: 1 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: alpha(theme.palette.primary.light, 0.05),
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  {project.taskCategories[activeCategory].name}
                </Typography>
              
              </Box>

              {/* Aggiungi bottone per creare nuovo task */}
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  /* Logica per aggiungere task */
                }}
              >
                Add Task
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Usa key per forzare il re-rendering quando cambia la categoria */}
            <TaskList
              key={activeCategory}
              initialTasks={project.taskCategories[activeCategory].tasks}
              
            />

            {/* Mostra messaggio se non ci sono task */}
            {project.taskCategories[activeCategory].tasks.length === 0 && (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary" gutterBottom>
                  No tasks in this category yet
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => {
                    /* Logica per aggiungere task */
                  }}
                >
                  Add Your First Task
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </Container>
  );
}

// Utility function to create alpha colors
function alpha(color: string, value: number) {
  return (
    color +
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: (theme.shadows as string[])[3],
  width: "100%",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: (theme.shadows as string[])[6],
  },
}));

const StyledStatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.primary.light, 0.08)
      : alpha(theme.palette.primary.dark, 0.08),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
}));

export default ProjectDetailsPage;
