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
        <Typography variant="h4" gutterBottom>
          {project.name}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {new Date(project.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {project.description}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
            <Typography variant="body1" fontWeight="bold">Status:</Typography>
            <Typography variant="body1">{project.description}</Typography>
            
            <Typography variant="body1" fontWeight="bold">Client:</Typography>
            
            <Typography variant="body1" fontWeight="bold">Budget:</Typography>
            
            <Typography variant="body1" fontWeight="bold">Deadline:</Typography>
            <Typography variant="body1">
              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not specified'}
            </Typography>

            <Typography variant="body1" fontWeight="bold">Tasks:</Typography>
            <Typography variant="body1">{project.taskCategories.map((category) => category.tasks.map(
              (task) => task.name).join(", ") )}</Typography>
            
           
            

          </Box>
        </Box>
      </Box>


    </Container>
    
  );



}

export default ProjectDetailsPage;
