"use client";
export type TaskStatus = "Pendente" | "Em Andamento" | "Concluída";
export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
}


export interface TaskDescriptionProps {
  open: boolean;
  onClose: () => void;
  detailedTask: Task | null;
}
export interface TaskEditProps {
    open: boolean;
    onClose: () => void;
    editedTask: Task | null;
    onEditTask: (editedTask: Task) => void;
  }
export interface NewTaskModalProps {
    open: boolean;
    onClose: () => void;
    tasksList: Task[];
    onTaskCreate: (newTask: Task) => void;
  }