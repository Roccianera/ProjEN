import { Stack } from "@mui/material";
import ProjectCard from "../components/ProjectDashboard/ProjectCard";
import { useEffect, useState } from "react";
import { ProjectData, ProjectDetails } from "../type/type";
import { getProjectList } from "../service/projectService";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useTheme } from "@emotion/react";

import PromptPanel from "../components/PromptPanel";

function DashboardPage() {
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfTasksForProject, setNumberOfTasksForProject] = useState<
    number[]
  >([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const theme = useTheme();

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
  }, [shouldFetch]);

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
      <Stack
        spacing={2}
        sx={{ padding: 2 }}
        justifyContent={"center"}
        alignItems={"center"}
        borderColor={"black"}
      >
        {projects.map((project, ind) => {
          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              taskLeft={numberOfTasksForProject[ind]}
              totalTasks={project.taskCategories.reduce(
                (acc, category) => acc + category.tasks.length,
                0
              )}
            />
          );
        })}
      </Stack>
      <PromptPanel shouldFetch={shouldFetch} setShouldFetch={setShouldFetch} />
    </>
  );
}

export default DashboardPage;
