import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDetails, TaskCategoryRequestDto } from "../type/type";
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import Grid from "@mui/material/GridLegacy";
import { getProjectById } from "../service/projectService";
import { createCategory } from "../service/categoryService";
import { createTask } from "../service/taskService";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import TaskList from "../components/TaskList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{
    name: string;
    description: string;
    endDate: string;
  }>({
    name: "",
    description: "",
    endDate: new Date().toISOString().split("T")[0],
  });
  const theme = useTheme();
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

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
  }, [id]);

  const refreshProjectData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveCategory(newValue);
  };

  const handleOpenTaskDialog = () => {
    setNewTask({
      name: "",
      description: "",
      endDate: new Date().toISOString().split("T")[0],
    });
    setIsTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setIsTaskDialogOpen(false);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !id) return;

    try {
      const categoryData: TaskCategoryRequestDto = {
        name: newCategoryName,
        projectId: Number(id),
      };

      await createCategory(categoryData);
      setNewCategoryName("");
      setIsCategoryDialogOpen(false);
      refreshProjectData();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

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

  if (error || !project) {
    return (
      <Container>
        <Alert severity="error">{error || "Project not found"}</Alert>
      </Container>
    );
  }

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

            </StyledStatsCard>
          </Grid>
        </Grid>
      </StyledCard>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AssignmentIcon fontSize="large" /> Tasks by Category
          </div>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={() => setIsCategoryDialogOpen(true)}
          >
            Add Category
          </Button>
        </Typography>

        <Dialog
          open={isCategoryDialogOpen}
          onClose={() => setIsCategoryDialogOpen(false)}
        >
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCategory}
              variant="contained"
              disabled={!newCategoryName.trim()}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

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

              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleOpenTaskDialog}
              >
                Add Task
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <TaskList
              key={activeCategory}
              initialTasks={project.taskCategories[activeCategory].tasks}
              categoryId={project.taskCategories[activeCategory].id}
              onTaskChange={refreshProjectData}
            />

            {project.taskCategories[activeCategory].tasks.length === 0 && (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary" gutterBottom>
                  No tasks in this category yet
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleOpenTaskDialog}
                >
                  Add Your First Task
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      <Dialog open={isTaskDialogOpen} onClose={handleCloseTaskDialog}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            value={newTask.name}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="Due Date"
            type="date"
            fullWidth
            value={newTask.endDate}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, endDate: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button
            onClick={async () => {
              if (!project || !newTask.name.trim()) return;

              try {
                const taskData = {
                  ...newTask,
                  taskCategoryId: project.taskCategories[activeCategory].id,
                };

                await createTask(taskData);
                handleCloseTaskDialog();
                refreshProjectData();
              } catch (error) {
                console.error("Failed to create task:", error);
              }
            }}
            variant="contained"
            disabled={!newTask.name.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

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
