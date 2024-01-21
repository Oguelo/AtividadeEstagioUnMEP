"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from 'js-cookie';
import {
  Button,
  styled,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
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
} from "@mui/material";
import {
  DeleteOutlined as DeleteOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
  Task,
} from "@mui/icons-material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider"; // Certifique-se de fornecer o caminho correto

const COOKIELIST = "tasksListSaved";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  m: 0,
  p: 2,
  textAlign: "center",
  backgroundColor: "#E5E2E2",
  fontFamily: "Roboto",
  fontSize: "20px",
});

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
    setNewTask({
      title: "",
      description: "",
      date: "",
      status: "Pendente",
    });
  };

  const handleClose = (event) => {
    if (event !== "backdropClick") {
      onClose();
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
            <Typography color="dark.main">Titulo:</Typography>
            <TextField
              required
              fullWidth
              size="small"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </Grid>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography color="dark.main">Descrição:</Typography>
            <TextField
              required
              fullWidth
              size="small"
              multiline
              rows={4}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </Grid>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography color="dark.main">Data:</Typography>
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
            color="success"
            variant="contained"
            onClick={handleCreateTask}
          >
            Criar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={(e) => handleClose(e, "click")}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};

const ListaTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [detailedTask, setDetailedTask] = useState(null);

  useEffect(() => {
    const savedTasksJSON = Cookies.get(COOKIELIST);
    if (savedTasksJSON) {
      const savedTasks = JSON.parse(savedTasksJSON);
      setTasks(savedTasks);
    }
  }, []);

  const saveTasksToCookie = (updatedTasks) => {
    Cookies.set(COOKIELIST, JSON.stringify(updatedTasks));
  };

  const TaskCreate = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      saveTasksToCookie(updatedTasks);
      return updatedTasks;
    });
  };

  const StatusChange = (task, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((t) =>
        t === task ? { ...t, status: newStatus } : t
      );
      saveTasksToCookie(updatedTasks);
      return updatedTasks;
    });
  };

  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const DeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setOpenModal(false);
    saveTasksToCookie(updatedTasks);
  };

  const EditTask = () => {
    console.log("Editar tarefa:", selectedTask);
  };

  const handleOpenDetailedModal = (task) => {
    setDetailedTask(task);
    setOpenModal(true);
  };

  return (
    <Grid container>
      <Grid
        xs={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid xs={4}>
          <Typography color="dark.main" variant="h6">
            Minhas Tarefas
          </Typography>
          <Divider width={"35%"} />
        </Grid>
        <Grid xs={3} textAlign="right">
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Criar nova tarefa
          </Button>
        </Grid>
      </Grid>

      <Grid xs={12} container>
        <Grid xs={12}>
          <Paper>
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader size="medium" aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Titulo</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{task.title}</TableCell>
                        <TableCell align="center">{task.date}</TableCell>
                        <TableCell align="center">
                          <Select
                            value={task.status}
                            onChange={(e) =>
                              StatusChange(
                                task,
                                e.target.value
                              )
                            }
                            style={{
                              backgroundColor:
                                task.status === "Em Andamento"
                                  ? "yellow"
                                  : task.status === "Concluída"
                                  ? "Chartreuse"
                                  : task.status === "Pendente"
                                  ? "OrangeRed"
                                  : "",
                            }}
                          >
                            <MenuItem
                              value="Em Andamento"
                              style={{ backgroundColor: "yellow" }}
                            >
                              Em Andamento
                            </MenuItem>
                            <MenuItem
                              value="Concluída"
                              style={{ backgroundColor: "Chartreuse" }}
                            >
                              Concluída
                            </MenuItem>
                            <MenuItem
                              value="Pendente"
                              style={{ backgroundColor: "OrangeRed" }}
                            >
                              Pendente
                            </MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            startIcon={<DeleteOutlinedIcon />}
                            onClick={() => {
                              setSelectedTask(task);
                              DeleteTask(task);
                            }}
                          >
                            Excluir
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={EditTask}
                            startIcon={<EditOutlinedIcon />}
                          >
                            Editar
                          </Button>
                          <Button
                            color="success"
                            size="small"
                            variant="contained"
                            onClick={() => handleOpenDetailedModal(task)}
                            startIcon={<RemoveRedEyeOutlinedIcon />}
                          >
                            Descrição
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={ChangePage}
              onRowsPerPageChange={ChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      <NewTaskModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onTaskCreate={TaskCreate}
      />
      <BootstrapDialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent dividers>
          <Typography variant="h5" color="primary" dividers style={{ maxHeight: '80vh'}} >
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
                style={{ width: '100%', minHeight: '100px', maxHeight: '300px' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            variant="contained"
            color="primary"
          >
            Fechar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
};

export default ListaTasks;
