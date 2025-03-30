import React from "react";
import { Card, Typography, Box, Chip, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import { ProjectData } from "../../type";

// Enhanced styled card with better spacing and responsive design
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  width: "80%",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
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
  totalTasks?: number;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

function ProjectCard({ 
  name, 
  taskLeft, 
  totalTasks = 10, 
  dueDate,
  priority = "medium" 
}: ProjectCardProps) {
  const theme = useTheme();
  

  // Calculate completion percentage
  const completedTasks = totalTasks - taskLeft;
  const progressPercentage = (completedTasks / totalTasks) * 100;
  
  // Determine priority color
  const priorityColors = {
    low: theme.palette.success.main,
    medium: theme.palette.warning.main,
    high: theme.palette.error.main
    
  };

  return (
    <StyledCard>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color={theme.palette.text.primary}>
          {name}
        </Typography>
        <Chip 
          label={priority.toUpperCase()} 
          size="small"
          sx={{ 
            backgroundColor: priorityColors[priority],
            color: theme.palette.common.white
          }}
        />
      </Box>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
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
