import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Avatar,
  AvatarGroup,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

// Interfaces for type safety
interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed";
  assignee: string;
  category: string;
  dueDate: string;
}

interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  team: Array<{
    id: number;
    name: string;
    avatar: string;
  }>;
  categories: string[];
  tasks: Task[];
}

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

// Mock data (replace with actual data from your API)
const mockProject: ProjectDetails = {
  id: 1,
  title: "Website Redesign",
  description:
    "Complete overhaul of company website with modern design and improved UX",
  startDate: "2024-03-01",
  endDate: "2024-06-30",
  progress: 65,
  team: [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://mui.com/static/images/avatar/2.jpg",
    },
  ],
  categories: ["Frontend", "Backend", "Design", "Testing"],
  tasks: [
    {
      id: 1,
      title: "Design System Creation",
      description: "Create a comprehensive design system",
      status: "completed",
      assignee: "Jane Smith",
      category: "Design",
      dueDate: "2024-04-15",
    },
    {
      id: 2,
      title: "API Development",
      description: "Develop RESTful APIs for the backend",
      status: "in_progress",
      assignee: "John Doe",
      category: "Backend",
      dueDate: "2024-05-10",
    },
  ],
};

function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(mockProject.tasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getTasksByCategory = (category: string) => {
    return tasks.filter((task) => task.category === category);
  };

  const handleOpenDialog = (task: Task | null = null) => {
    setEditingTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingTask(null);
    setOpenDialog(false);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? editingTask : task
        )
      );
    } else {
      // Create new task
      const newTask: Task = {
        id: tasks.length + 1,
        title: "New Task",
        description: "Task description",
        status: "todo",
        assignee: "Unassigned",
        category: mockProject.categories[currentTab],
        dueDate: "2024-12-31",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      {/* Project Header */}
      <StyledPaper>
        <Typography variant="h4">{mockProject.title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {mockProject.description}
        </Typography>
      </StyledPaper>

      {/* Tabs for Categories */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ marginBottom: 3 }}
      >
        {mockProject.categories.map((category, index) => (
          <Tab key={category} label={category} />
        ))}
      </Tabs>

      {/* Tasks by Category */}
      {mockProject.categories.map((category, index) => (
        <div key={category} hidden={currentTab !== index}>
          {currentTab === index && (
            <CategoryCard>
              <CardContent>
                <Typography variant="h6">{category} Tasks</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenDialog()}
                  sx={{ marginBottom: 2 }}
                >
                  Add Task
                </Button>
                <Timeline>
                  {getTasksByCategory(category).map((task) => (
                    <TimelineItem key={task.id}>
                      <TimelineSeparator>
                        <TimelineDot
                          color={
                            task.status === "completed"
                              ? "success"
                              : task.status === "in_progress"
                              ? "primary"
                              : "grey"
                          }
                        />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle1">
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            size="small"
                            label={task.status}
                            color={
                              task.status === "completed"
                                ? "success"
                                : task.status === "in_progress"
                                ? "primary"
                                : "default"
                            }
                          />
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => handleOpenDialog(task)}
                            sx={{ ml: 2 }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTask(task.id)}
                            sx={{ ml: 1 }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </CategoryCard>
          )}
        </div>
      ))}

      {/* Dialog for Adding/Editing Tasks */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={editingTask?.title || ""}
            onChange={(e) =>
              setEditingTask((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={editingTask?.description || ""}
            onChange={(e) =>
              setEditingTask((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProjectPage;
