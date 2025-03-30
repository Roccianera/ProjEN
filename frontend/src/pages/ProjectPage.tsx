import React from "react";
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
    // Add more team members
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
    // Add more tasks
  ],
};

function ProjectPage() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getTasksByCategory = (category: string) => {
    return mockProject.tasks.filter((task) => task.category === category);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      {/* Project Header */}
      <StyledPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {mockProject.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {mockProject.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={mockProject.progress}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle2">Team Members</Typography>
              <AvatarGroup max={4}>
                {mockProject.team.map((member) => (
                  <Avatar
                    key={member.id}
                    alt={member.name}
                    src={member.avatar}
                  />
                ))}
              </AvatarGroup>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Tasks by Category */}
      <Box sx={{ width: "100%", mt: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {mockProject.categories.map((category, index) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>

        {mockProject.categories.map((category, index) => (
          <div key={category} role="tabpanel" hidden={currentTab !== index}>
            {currentTab === index && (
              <CategoryCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category} Tasks
                  </Typography>
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
                            <Typography variant="caption" sx={{ ml: 2 }}>
                              Due: {task.dueDate}
                            </Typography>
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
      </Box>
    </Box>
  );
}

export default ProjectPage;
