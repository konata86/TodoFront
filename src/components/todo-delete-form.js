"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";

export default function TodoDeleteFormDialog(props) {
  const { id, taskName, getTodos } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/todo/delete", { id: id })
      .then((res) => {
        getTodos();
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete" sx={{ m: 1 }}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>タスクの削除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            「{taskName}」を削除します、よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleDelete}>はい</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
