"use client";
import { theme } from "@/app/theme";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importe o gerador de UUID
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TextareaAutosize from '@mui/material/TextareaAutosize';

import {
  Button,
  Modal,
  styled,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Switch,
  SelectChangeEvent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Paper,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material";
import { Task } from "@mui/icons-material";

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

const NewtaskModal = ({
  open,
  onClose,
  onTaskCreate,
}: {
  open: boolean;
  onClose: () => void;
  onTaskCreate: (newTask: Task) => void;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const [newtaskTitle, setNewtaskTitle] = useState("");
  const [newtaskDescription, setNewtaskDescription] = useState("");
  const [newtaskDate, setNewtaskDate] = useState("");
  const [newtaskStatus, setNewtaskStatus] =
    useState<Task["status"]>("Pendente");

  const handleCreateTask = () => {
    const newTask: Task = {
      title: newtaskTitle,
      description: newtaskDescription,
      date: newtaskDate,
      status: newtaskStatus,
    };
    onTaskCreate(newTask);
    setIsOpen(false);

    onClose();
    setNewtaskTitle("");
    setNewtaskDescription("");
    setNewtaskDate("");
    setNewtaskStatus("Pendente");
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setIsOpen(false);
      onClose();
    }
  };

  return (
    <BootstrapDialog
      open={isOpen}
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
              value={newtaskTitle}
              onChange={(e) => setNewtaskTitle(e.target.value)}
            ></TextField>
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
              value={newtaskDescription}
              onChange={(e) => setNewtaskDescription(e.target.value)}
            ></TextField>
          </Grid>
          <Grid xs={12}></Grid>
          <Grid xs={12} md={6}>
            <Typography color="dark.main">Data:</Typography>
            <TextField
              required
              fullWidth
              type="date"
              size="small"
              value={newtaskDate}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewtaskDate(e.target.value)}
            ></TextField>
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [detailedTask, setDetailedTask] = useState<Task | null>(null);
  

  const TaskCreate = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const StatusChange = (task: Task, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t === task ? { ...t, status: newStatus } : t))
    );
  };

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const DeleteTask = (taskToDelete: Task) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setOpenModal(false); // Fechar o modal após a exclusão
  };

  const EditTask = () => {
    console.log("Editar tarefa:", selectedTask);
  };


  const handleOpenDetailedModal = (task: Task) => {
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
                      <TableRow
                        key={index}
                        
                      >
                        <TableCell align="center">{task.title}</TableCell>
                        <TableCell align="center">{task.date}</TableCell>
                        <TableCell align="center">
                          <Select
                            value={task.status}
                            onChange={(e) =>
                              StatusChange(
                                task,
                                e.target.value as Task["status"]
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
                              style={{ backgroundColor: "	OrangeRed" }}
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
                            Descriçao
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

      <NewtaskModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onTaskCreate={TaskCreate}
      />
      <BootstrapDialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent dividers>
          <Typography variant="h5" color="primary" dividers style={{ maxHeight: '80vh'}} >
            Descriçao da Tarefa
          </Typography>
          {detailedTask && (
            <>
              <Typography variant="subtitle1">
                <strong>Descriçao:</strong> 
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
