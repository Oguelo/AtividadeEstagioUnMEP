import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  DialogContent,
  DialogActions,
  Stack,
  Select,
  MenuItem,
  TextareaAutosize,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { theme } from "@/app/styles/theme";
import {
  BootstrapDialog,
  StyledDialogTitle,
  TaskStatusColors,
} from "@/app/styles/theme";
import { Task, TaskStatus,TaskDescriptionProps, TaskEditProps, NewTaskModalProps } from "@/app/components/Task";



const isFormValid = (newTask: Task) => {
  return (
    newTask.title !== "" && newTask.description !== "" && newTask.date !== ""
  );
};

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  open,
  onClose,
  tasksList,
  onTaskCreate,
}) => {
  const [newTaskError, setNewTaskError] = useState<string>("");
  const [newTask, setNewTask] = useState<Task>({
    id: null,
    title: "",
    description: "",
    date: "",
    status: "Pendente",
  });

  function duplicateTask(
    newTask: Task,
    tasksList: Task[],
    setNewTaskError: React.Dispatch<React.SetStateAction<string>>
  ) {
    const existingTasks = tasksList.map((task) => ({
      title: task.title.toLowerCase(),
      date: task.date.toLowerCase(),
    }));

    const newTaskTitle = newTask.title.toLowerCase();
    const newTaskDate = newTask.date.toLowerCase();

    if (
      existingTasks.some(
        (task) => task.title === newTaskTitle && task.date === newTaskDate
      )
    ) {
      return "Já existe uma tarefa igual cadastrada no mesmo dia, escolha outro dia";
    }

    return null;
  }

  const handleCreateTask = () => {
    const duplicateError = duplicateTask(newTask, tasksList, setNewTaskError);

    if (duplicateError) {
      setNewTaskError(duplicateError);
      return;
    }

    setNewTaskError("");

    onTaskCreate(newTask);
    onClose();
    setNewTask({
      id: null,
      title: "",
      description: "",
      date: "",
      status: "Pendente",
    });
  };

  const handleClose = (event: string) => {
    if (event !== "backdropClick") {
      onClose();
      setNewTask({
        id: null,
        title: "",
        description: "",
        date: "",
        status: "Pendente",
      });
      setNewTaskError("");
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      style={{ width: "100%", height: "100%" }}
    >
      <StyledDialogTitle id="customized-dialog-title">
        <strong>Criar nova tarefa</strong>
      </StyledDialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent="center">
          <Grid xs={12} md={6}>
            <Grid xs={5} sx={{ textAlign: "right" }}>
              <label style={{ color: theme.palette.dark.main }}>
                Preencha todos os campos *
              </label>
            </Grid>
            <Typography sx={{ color: theme.palette.dark.main }}>
              Titulo:
            </Typography>
            <TextField
              required
              fullWidth
              size="small"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </Grid>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography sx={{ color: theme.palette.dark.main }}>
              Descrição:
            </Typography>
            <TextField
              required
              fullWidth
              size="small"
              multiline
              rows={4}
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </Grid>
          <Grid xs={12}></Grid>
          <Select
            value={newTask.status}
            style={{
              backgroundColor: TaskStatusColors[newTask.status] || "",
            }}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value as TaskStatus })
            }
          >
            {Object.keys(TaskStatusColors).map((status) => (
              <MenuItem
                key={status}
                value={status}
                style={{ backgroundColor: TaskStatusColors[status] }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography sx={{ color: theme.palette.dark.main }}>
              Data:
            </Typography>
            <TextField
              required
              fullWidth
              type="date"
              size="small"
              value={newTask.date}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            />
            {newTaskError && (
              <FormHelperText error>{newTaskError}</FormHelperText>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Stack
          justifyContent="center"
          gap={2}
          flexDirection="row"
          width={1.0}
          flexWrap="wrap"
        >
          <Button
            sx={{ backgroundColor: theme.palette.success.main }}
            variant="contained"
            onClick={handleCreateTask}
            disabled={!isFormValid(newTask)}
          >
            Criar
          </Button>
          <Button
            sx={{ backgroundColor: theme.palette.error.main }}
            variant="contained"
            onClick={(e) => handleClose(e.type)}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};


const TaskDescription: React.FC<TaskDescriptionProps> = ({
  open,
  onClose,
  detailedTask,
}) => {
  return (
    <BootstrapDialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Typography
          variant="h5"
          color="primary"
          dividers
          style={{ maxHeight: "80vh" }}
        >
          Descrição da Tarefa
        </Typography>
        {detailedTask && (
          <>
            <Typography variant="subtitle1">
              <strong>Descrição:</strong>
            </Typography>
            <TextareaAutosize
              readOnly
              aria-label="Descrição da tarefa"
              value={detailedTask.description}
              style={{ width: "100%", minHeight: "100px", maxHeight: "300px" }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

const TaskEdit: React.FC<TaskEditProps> = ({ open, onClose, editedTask, onEditTask }) => {
  const [editTask, setEditTask] = useState<Task>({
    id: editedTask?.id,
    title: editedTask?.title,
    description: editedTask?.description,
    date: editedTask?.date,
    status: editedTask?.status,
  });

  const handleClose = (event: string) => {
    if (event !== "backdropClick") {
      onClose();
      setEditTask((prevEditTask: Task) => ({
        ...prevEditTask,
        id: editedTask?.id ,
        title: editedTask?.title,
        description: editedTask?.description,
        date: editedTask?.date ,
        status: editedTask?.status,
      }));
    }
  };

  const handleEditTask = () => {
    onClose();
    onEditTask(editTask);
  };

  useEffect(() => {
    if (editedTask) {
      setEditTask({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
        date: editedTask.date,
        status: editedTask.status,
      });
    }
  }, [editedTask]);
  return (
    <BootstrapDialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Grid container justifyContent="center">
          <Grid xs={12} md={6}>
            <Grid xs={12} sx={{ textAlign: "right" }}>
              <label color="dark">Preencha todos os campos *</label>
            </Grid>
            <Typography color="dark">Titulo:</Typography>
            <TextField
              required
              fullWidth
              size="small"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
          </Grid>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography color="dark">Descrição:</Typography>
            <TextField
              required
              fullWidth
              size="small"
              multiline
              rows={4}
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
          </Grid>
          <Grid xs={12}></Grid>

          <Grid xs={12} md={6}>
            <Typography color="dark">Data:</Typography>
            <TextField
              required
              fullWidth
              type="date"
              size="small"
              value={editTask.date}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setEditTask({ ...editTask, date: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleEditTask()}
          variant="contained"
          color="success"
          disabled={!isFormValid(editTask)}
        >
          Salvar
        </Button>

        <Button
          onClick={(e) => handleClose(e)}
          variant="contained"
          color="primary"
        >
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export { TaskDescription, TaskEdit, NewTaskModal };
