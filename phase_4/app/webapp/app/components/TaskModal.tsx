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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TablePagination,
  TextareaAutosize,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// Certifique-se de fornecer o caminho correto
import { theme } from "@/app/theme";
import {
  BootstrapDialog,
  StyledDialogTitle,
  TaskStatusColors,
} from "@/app/theme";

const NewTaskModal = ({ open, onClose, onTaskCreate }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pendente",
  });
  const handleCreateTask = () => {
    onTaskCreate(newTask);
    onClose();
    setNewTask({ title: "", description: "", date: "", status: "Pendente" });
  };
  const handleClose = (event) => {
    if (event !== "backdropClick") {
      onClose();
      setNewTask({ title: "", description: "", date: "", status: "Pendente" });
    }
  };
  const isFormValid = () => {
    return (
      newTask.title.trim() !== "" &&
      newTask.description.trim() !== "" &&
      newTask.date.trim() !== ""
    );
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
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
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
            disabled={!isFormValid()}
          >
            Criar
          </Button>
          <Button
            sx={{ backgroundColor: theme.palette.error.main }}
            variant="contained"
            onClick={(e) => handleClose(e)}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};

const TaskDescription = ({ open, onClose, detailedTask }) => {
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

const TaskEdit = ({ open, onClose, editedTask ,  onEditTask}) => {
  const [editTask, setEditTask] = useState({
    title: editedTask?.title || "",
    description: editedTask?.description || "",
    date: editedTask?.date || "",
  });
  const handleClose = (event) => {
    if (event !== "backdropClick") {
      onClose();
      setEditTask((prevEditTask) => ({
        ...prevEditTask,
        title: editedTask.title,
        description: editedTask.description,
        date: editedTask.date,
      }));
    }
  };

  const handleEditTask = () => {
    onClose();
    setEditTask((prevEditTask) => ({
      ...prevEditTask,
      title: editTask.title,
      description: editTask.description,
      date: editTask.date,
    }));
    onEditTask(editTask);
  };

  useEffect(() => {
    if (editedTask) {
      setEditTask({
        title: editedTask.title || "",
        description: editedTask.description || "",
        date: editedTask.date || "",
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
