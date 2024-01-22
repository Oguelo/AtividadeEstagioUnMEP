"use client";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
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
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider"; // Certifique-se de fornecer o caminho correto
import { theme } from "@/app/theme";
import {
  BootstrapDialog,
  StyledDialogTitle,
  TaskStatusColors,
} from "@/app/theme";
import TaskDescription from "@/app/components/TaskDescription";
const COOKIELIST = "tasksListSaved";

const NewTaskModal = ({ open, onClose, onTaskCreate }) => {
  const [newTask, setNewTask] = useState({id: null, title: "",description: "",date: "",status: "Pendente",});
  const handleCreateTask = () => {onTaskCreate(newTask);onClose();setNewTask({ id: null, title: "", description: "", date: "", status: "Pendente" });};
  const handleClose = (event) => {
    if (event !== "backdropClick") {
      onClose();
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

 
  const TaskCreate = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:3000/activity', newTask);
      const mensagem = response.data.message;
      const novaID = response.data.id;
      if (mensagem === "OK"){
        setNewTask((prevTask) => ({ ...prevTask, id: novaID }));
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks, newTask];
        
          return updatedTasks;
        });
      }
  }catch(error){
    console.error('A task não foi salva:', error);
  }
  };

  
  const StatusChange = async (task, newStatus) => {
    try {
      
      
      const updatedTasks = tasks.map((t) =>
        t === task ? { ...t, status: newStatus } : t
      );
      const id = task.id;
      setTasks(updatedTasks);
  
      const response = await axios.patch(`http://localhost:3000/activity/${id}`, updatedTasks);
    } catch (error) {
      console.error('Erro durante a atualização da tarefa:', error);
    }
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
  };

  const EditTask = () => {
    console.log("Editar tarefa:", selectedTask);
  };

  const OpenDetailedModal = (task) => {
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
          <Typography sx={{ color: theme.palette.dark.main }} variant="h6">
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
                        <TableCell align="center">{task.id}</TableCell>
                        <TableCell align="center">{task.title}</TableCell>
                        <TableCell align="center">{task.date}</TableCell>
                        <TableCell align="center">
                          <Select
                            value={task.status}
                            onChange={(e) => StatusChange(task, e.target.value)}
                            style={{
                              backgroundColor:
                                TaskStatusColors[task.status] || "",
                            }}
                          >
                            {Object.keys(TaskStatusColors).map((status) => (
                              <MenuItem
                                key={status}
                                value={status}
                                style={{
                                  backgroundColor: TaskStatusColors[status],
                                }}
                              >
                                {status}
                              </MenuItem>
                            ))}
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
                            onClick={() => OpenDetailedModal(task)}
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
      <TaskDescription
        open={openModal}
        onClose={() => setOpenModal(false)}
        detailedTask={detailedTask}
      />
    </Grid>
  );
};

export default ListaTasks;
