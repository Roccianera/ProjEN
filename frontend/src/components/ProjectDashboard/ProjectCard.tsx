import React from "react";
import { Card, Typography, Box, Chip, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import { ProjectData } from "../../type/type";
import { useNavigate } from "react-router-dom";

// Enhanced styled card with better spacing and responsive design
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  width: "100%",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

// Styled progress component
const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  marginTop: theme.spacing(2),
  backgroundColor: "black",
}));

interface ProjectCardProps extends ProjectData {
  id: number;
  totalTasks?: number;
  dueDate?: string;
}

function ProjectCard({
  id,
  name,
  taskLeft,
  totalTasks = 10,
  dueDate,
}: ProjectCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Calculate completion percentage
  const completedTasks = totalTasks - taskLeft;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const handleCardClick = (e: React.MouseEvent) => {
    navigate(`/projects/${id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.text.primary}
        >
          {name}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="body1" color={theme.palette.text.secondary}>
          {taskLeft} of {totalTasks} tasks remaining
        </Typography>
        {dueDate && (
          <Typography variant="body2" color={theme.palette.text.secondary}>
            Due: {dueDate}
          </Typography>
        )}
      </Box>

      <StyledProgress
        variant="determinate"
        value={progressPercentage}
        color={taskLeft === 0 ? "success" : "primary"}
      />
    </StyledCard>
  );
}

export default ProjectCard;
