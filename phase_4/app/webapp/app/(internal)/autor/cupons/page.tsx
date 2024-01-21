"use client";

import { theme } from "@/app/theme";
import React, { useEffect, useState } from "react";
import Divider from "@/app/components/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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

const NewtaskModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    
    const [newtaskTitle, setNewtaskTitle] = useState("");
    const [newtaskDescription, setNewtaskDescription] = useState("");
    const [newtaskDate, setNewtaskDate] = useState("");
    const [newtaskStatus, setNewtaskStatus] = useState("");



    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setIsOpen(false);
            onClose();
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setPercent(event.target.value as number);
    };

    return (
        <BootstrapDialog open={isOpen} onClose={handleClose} fullWidth maxWidth={false} style={{ width: '100%', height: '100%' }}>
            <StyledDialogTitle id="customized-dialog-title">
                <strong>Criar nova Task</strong>
            </StyledDialogTitle>
            <DialogContent dividers>
                <Grid container justifyContent="center">
                    <Grid xs={12} md={6}>
                        <Typography color="dark.main">Nome do cupom:</Typography>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            value={newtaskTitle}
                            onChange={(e) => setNewtaskTitle(e.target.value)}
                            size="small"
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
                <Stack justifyContent="center" gap={2} flexDirection="row" width={1.0} flexWrap="wrap">
                    <Button color="success" variant="contained" onClick={(e) => handleClose(e, "click")}>
                        Criar
                    </Button>
                    <Button color="error" variant="contained" onClick={(e) => handleClose(e, "click")}>
                        Cancelar
                    </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
};

const listaTasks = () => {
    const tasks = [];

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Grid container>
            <Grid xs={12} container direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Grid xs={4}>
                    <Typography sx={{ color: theme.palette.dark.main }} variant="h6">
                        Minhas Tasks
                    </Typography>
                    <Divider width={"35%"} />
                </Grid>
                <Grid xs={3} textAlign="right">
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            setOpen(true);
                        }}
                    >
                        Criar nova Task
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
                                        <TableCell align="center">Excluir</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((e) => {
                                        return (
                                            <TableRow key={e.id}>
                                                <TableCell align="center">{e.name}</TableCell>
                                                <TableCell align="center">
                                                    <Chip color="success" label={e.percent + "%"} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Switch color="success" value={e.status} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button size="small" variant="contained" color="error" startIcon={<DeleteOutlinedIcon />}>
                                                        Excluir
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <NewtaskModal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
        </Grid>
    );
};

export default listaTasks;
