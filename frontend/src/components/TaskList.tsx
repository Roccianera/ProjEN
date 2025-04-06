import React, { useState, useEffect } from "react";
import TaskComponent from "./Task";
import { Task, TaskRequestDto } from "../type/type";
import {
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { createTask, deleteTask, updateTask } from "../service/taskService";

interface TaskListProps {
  initialTasks?: Task[];
  categoryId: number;
  onTaskChange?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  initialTasks = [],
  categoryId,
  onTaskChange,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState<
    Omit<TaskRequestDto, "taskCategoryId">
  >({
    name: "",
    description: "",
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleOpenDialog = () => {
    setNewTask({
      name: "",
      description: "",
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

  const handleAddTask = async () => {
    try {
      const taskData: TaskRequestDto = {
        ...newTask,
        taskCategoryId: categoryId,
      };

      const createdTask = await createTask(taskData);
      setTasks([...tasks, createdTask]);
      setOpenDialog(false);

      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));

      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const taskData: TaskRequestDto = {
        name: updatedTask.name,
        description: updatedTask.description,
        endDate: updatedTask.endDate,
        taskCategoryId: categoryId,
      };

      await updateTask(updatedTask.id, taskData);
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );

      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleStatusChange = async (id: number, status: boolean) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;

    try {
      const taskData: TaskRequestDto = {
        name: taskToUpdate.name,
        description: taskToUpdate.description,
        endDate: taskToUpdate.endDate,
        taskCategoryId: categoryId,
      };

      const updatedTask = await updateTask(id, {
        ...taskData,
        isCompleted: status,
      });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: status } : task
        )
      );

      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <Container maxWidth="md">
     

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
