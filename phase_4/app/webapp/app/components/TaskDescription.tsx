import React from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { BootstrapDialog } from "../theme";

const TaskDescription = ({ open, onClose, detailedTask }) => {
  return (
    <BootstrapDialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <Typography variant="h5" color="primary" dividers style={{ maxHeight: "80vh" }}>
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

export default TaskDescription;
