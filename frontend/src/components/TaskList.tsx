import React, { useState } from "react";
import TaskComponent from "./Task";
import { Task } from "../type/type";
import {
  Box,
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TaskListProps {
  initialTasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    isCompleted: false,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const handleOpenDialog = () => {
    setNewTask({
      name: "",
      description: "",
      isCompleted: false,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, ...newTask }]);
    setOpenDialog(false);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleStatusChange = (id: number, status: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: status } : task
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Task List</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Task
        </Button>
      </Box>

      {tasks.length === 0 ? (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No tasks available. Add a new task to get started.
        </Typography>
      ) : (
        tasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onStatusChange={handleStatusChange}
          />
        ))
      )}

      {/* Add Task Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            value={newTask.name}
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
            value={newTask.description}
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
            value={newTask.startDate}
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
            value={newTask.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            color="primary"
            variant="contained"
            disabled={!newTask.name.trim()}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList;
