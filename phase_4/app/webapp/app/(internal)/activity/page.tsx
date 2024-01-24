"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

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
  const [coringuei, setCoringuei] = useState(null);

  const TaskCreate = async (newTask: {
    title: string;
    description: string;
    date: string;
    status: string;
  }) => {
    const { title, description, date, status } = newTask;
    const newTaskWithoutId = { title, description, date, status };

    try {
      const response = await fetch("http://localhost:3000/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskWithoutId),
      });

      const responseData = await response.json(); 
      console.log(responseData);
      const id = parseInt(responseData.id);
      const title = responseData.title;
      const description = responseData.description;
      const date = responseData.date;
      const status = responseData.status;

      setTasks((prevTasks) => [
        ...prevTasks,
        { id, title, description, date, status },
      ]);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const StatusChange = async (task, newStatus) => {
    const id = parseInt(task.id);
    try {
        const updatedTask = { ...task, status: newStatus };
        const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
        setTasks(updatedTasks); 
        const response = await fetch(`http://localhost:3000/activity/status/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }), 
        });
        
    } catch (error) {
        setTasks(task);
        console.error("Erro durante a atualização da tarefa:", error);
    }
};
  
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const EditTask = async (editTask) => {
    const idTo = editTask.id;
    const {id, title, description, date, status } = editTask;
    const UpdateTask = {id, title, description, date, status };
    try {
      const response = await fetch(`http://localhost:3000/activity/${idTo}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UpdateTask), 
        });
        const updatedTasks = tasks.map((t) =>
        t === editTask ? { ...t, ...editTask } : t
      );
     
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro durante a atualização da tarefa:", error);
    }
    setOpenEditModal(false);
  };

  const DeleteTask = async (taskToDelete) => {
    try {
      const updatedTasks = tasks.filter((task) => task !== taskToDelete);
      setTasks(updatedTasks);
      setSelectedTask(null);
      setOpenModal(false);
      const id = parseInt(taskToDelete.id);
      const response = await fetch(`http://localhost:3000/activity/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: '',
        });
      
    } catch (error) {
      console.error("Erro durante a exclusão da tarefa:", error);
    }
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
                    <TableCell align="center">ID</TableCell>
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
                        <TableCell align="center">{[task.id]}</TableCell>
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
