import { Paper, Stack, Typography } from "@mui/material";
import ProjectCard from "../components/ProjectDashboard/ProjectCard";
import { useEffect, useState } from "react";
import { ProjectData, ProjectDetails, ProjectRequestDto } from "../type/type";
import {
  createProject,
  deleteProject,
  getProjectList,
} from "../service/projectService";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
  useTheme,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import PromptPanel from "../components/PromptPanel";

function DashboardPage() {
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfTasksForProject, setNumberOfTasksForProject] = useState<
    number[]
  >([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const theme = useTheme();

  // Project creation state
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    endDate: string;
  }>({
    name: "",
    description: "",
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0],
  });

  // Project deletion state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  //TODO move to utils
  const handleTaskCount = (projects: ProjectDetails[]) => {
    const projectsTasks = Array(projects.length).fill(0);

    projects.forEach((project, ind) => {
      const totalTasks = project.taskCategories.reduce(
        (acc, category) => acc + category.tasks.length,
        0
      );
      projectsTasks[ind] = totalTasks;
    });

    console.log("projectsTasks", projectsTasks);

    setNumberOfTasksForProject(Array.from(projectsTasks.values()));
  };

  useEffect(() => {
    const fetchProjectDatas = async () => {
      setLoading(true);
      setError(null);

      try {
        const projectData = await getProjectList();
        setProjects(projectData);
        handleTaskCount(projectData);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDatas();
  }, [refreshTrigger]);

  const refreshProjects = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenCreateDialog = () => {
    setNewProject({
      name: "",
      description: "",
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    });
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateProject = async () => {
    try {
      const projectData: ProjectRequestDto = {
        ...newProject,
        taskCategories: [],
      };

      await createProject(projectData);
      setOpenCreateDialog(false);
      refreshProjects();
    } catch (error) {
      console.error("Failed to create project:", error);
      setError("Failed to create project. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = (projectId: number) => {
    setProjectToDelete(projectId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete === null) return;

    try {
      await deleteProject(projectToDelete);
      setOpenDeleteDialog(false);
      refreshProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError("Failed to delete project. Please try again.");
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

  // Show error message
  if (error || !projects) {
    return (
      <Container>
        <Alert severity="error">{error || "Project not found"}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ position: "relative", minHeight: "80vh" }}>
        <Stack
          spacing={2}
          sx={{ padding: 2 }}
          justifyContent={"center"}
          alignItems={"center"}
          borderColor={"black"}
        >
          {projects && projects.length === 0 && (
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                textAlign: "center",
                width: "80%",
                py: 4,
              }}
            >
              <Stack spacing={2} alignItems="center">
                <AssignmentIcon fontSize="large" color="action" />
                <Typography variant="h5">No Projects Available</Typography>
                <Typography variant="body1">
                  Create your first project to get started.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateDialog}
                >
                  Create New Project
                </Button>
              </Stack>
            </Paper>
          )}

          {projects &&
            projects.length > 0 &&
            projects.map((project, ind) => {
              return (
                <Box
                  key={project.id}
                  sx={{ position: "relative", width: "80%" }}
                >
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    taskLeft={numberOfTasksForProject[ind]}
                    totalTasks={project.taskCategories.reduce(
                      (acc, category) => acc + category.tasks.length,
                      0
                    )}
                  />
                  <Button
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      opacity: 0.7,
                      "&:hover": { opacity: 1 },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation to project details
                      handleDeleteClick(project.id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              );
            })}
        </Stack>

        {/* Floating Action Button for adding new projects */}
        <Fab
          color="primary"
          aria-label="add project"
          sx={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={handleOpenCreateDialog}
        >
          <AddIcon />
        </Fab>

        {/* Create Project Dialog */}
        <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Project Name"
              type="text"
              fullWidth
              value={newProject.name}
              onChange={handleChange}
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
              value={newProject.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="endDate"
              label="Due Date"
              type="date"
              fullWidth
              value={newProject.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateDialog}>Cancel</Button>
            <Button
              onClick={handleCreateProject}
              variant="contained"
              disabled={!newProject.name.trim()}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <PromptPanel refreshProjects={refreshProjects} />
    </>
  );
}

export default DashboardPage;
