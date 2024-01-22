"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Typography,
  DialogActions,
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
} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@/app/components/Divider"; // Certifique-se de fornecer o caminho correto
import { theme } from "@/app/theme";
import { TaskStatusColors } from "@/app/theme";
import {
  TaskDescription,
  TaskEdit,
  NewTaskModal,
} from "@/app/components/TaskModal";

const COOKIELIST = "tasksListSaved";

const ListaTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [detailedTask, setDetailedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {// vou chamar a lista de tasks por aqui, nao apagar
    const SavedTasksJSON = Cookies.get(COOKIELIST);
    if (SavedTasksJSON) {
      const savedTasks = JSON.parse(SavedTasksJSON);
      setTasks(savedTasks);
    }
  }, []);

  const SaveTasksToCookie = (updatedTasks) => {
    Cookies.set(COOKIELIST, JSON.stringify(updatedTasks));
  };

  const TaskCreate = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      SaveTasksToCookie(updatedTasks);
      return updatedTasks;
    });
  };

  const StatusChange = (task, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((t) =>
        t === task ? { ...t, status: newStatus } : t
      );
      SaveTasksToCookie(updatedTasks);
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
  const EditTask = (editTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task !== editedTask ? task : { ...task, ...editTask }
      );
      SaveTasksToCookie(updatedTasks);
      return updatedTasks;
    });
    setOpenEditModal(false);
  };
  
  const DeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setOpenModal(false);
    SaveTasksToCookie(updatedTasks);
  };

  const OpenEditModal = (task) => {
    setEditedTask(task);
    setOpenEditModal(true);
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
                          <DialogActions>
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
                              onClick={() => OpenEditModal(task)}
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
                          </DialogActions>
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
      <TaskEdit
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        editedTask={editedTask}
        onEditTask={EditTask} 
      />
    </Grid>
  );
};

export default ListaTasks;
