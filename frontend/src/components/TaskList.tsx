import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../type/type";
// Aggiungi questo stato all'inizio del componente

// Aggiungi questo componente per la lista dei task
const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const navigate = useNavigate();
  if (!tasks || tasks.length === 0) {
    return <Alert severity="info">No tasks available.</Alert>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {tasks.map((task) => (
        <Paper
          key={task.id}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Typography variant="caption">
                <strong>Start:</strong>{" "}
                {new Date(task.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="caption">
                <strong>Due:</strong>{" "}
                {new Date(task.endDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chip
              label={task.isCompleted ? "Completed" : "In Progress"}
              color={task.isCompleted ? "success" : "primary"}
              size="small"
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TaskList;
