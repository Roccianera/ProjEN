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
} from "@mui/material";
import { getProjectById } from "../service/projectService";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import TaskComponent from "../components/Task";
import TaskList from "../components/TaskList";

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Create an async function inside useEffect
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

    // Add id to the dependency array so the effect runs when it changes
  }, [id]);

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

  // Render project details
  return (
    <Container>

      
      <Box sx={{ mt: 4 }}>
     
        <StyledCard>

          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {project.description}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            Due Date    {new Date(project.startDate).toLocaleDateString()}
          </Typography>

          </StyledCard>

     

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          
            <Typography variant="body1">
              {project.taskCategories.map((category) => 
                <TaskList key={category.id} initialTasks={category.tasks} />
              )}
            </Typography>
            
           
            

          </Box>
        </Box>


    </Container>
    
  );



}


const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: (theme.shadows as string[] )[3],
  width: "100%",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: (theme.shadows as string[])[6],
  },
}));
export default ProjectDetailsPage;
