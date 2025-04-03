import React, { useState } from "react";
import { Task } from "../type/type";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, CalendarToday } from "@mui/icons-material";
import { format } from "date-fns";

interface TaskProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (task: Task) => void;
  onStatusChange: (id: number, status: boolean) => void;
}

function TaskComponent({
  task,
  onDelete,
  onUpdate,
  onStatusChange,
}: TaskProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>({ ...task });

  const handleOpenDialog = () => {
    setEditedTask({ ...task });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = () => {
    onStatusChange(task.id, !task.isCompleted);
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderLeft: task.isCompleted
            ? "4px solid #4CAF50"
            : "4px solid #FFA726",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 3,
          },
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={task.isCompleted}
                onChange={handleStatusChange}
                color="success"
              />
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  color: task.isCompleted ? "text.secondary" : "text.primary",
                }}
              >
                {task.name}
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Edit task">
                <IconButton onClick={handleOpenDialog} color="primary">
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete task">
                <IconButton onClick={() => onDelete(task.id)} color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              ml: 4,
              mb: 1,
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.description}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", ml: 4 }}>
            <CalendarToday fontSize="small" color="action" />
            <Box sx={{ ml: 1, display: "flex", gap: 1 }}>
              <Chip
                label={`Start: ${task.startDate}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`Due: ${task.endDate}`}
                size="small"
                color={
                  new Date(task.endDate) < new Date() && !task.isCompleted
                    ? "error"
                    : "default"
                }
                variant="outlined"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            value={editedTask.name}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={editedTask.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={editedTask.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskComponent;
