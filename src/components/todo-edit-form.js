'use client'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack } from '@mui/material';
import axios from 'axios';

export default function TodoEditFormDialog(props) {
  
  const [open, setOpen] = useState(false);

  const { id, taskName, taskContent, getTodos } = props;

  const [formData, setFormData] = useState({"id": id, "title": taskName, "content": taskContent});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({"id": id, "title": taskName, "content": taskContent})
    setOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault(); 
    await axios.post("http://localhost:8080/todo/edit", formData).then((res) => {
      getTodos()
      setOpen(false)
    }).catch(e => {
      console.log(e);
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} sx={{ m: 1 }}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box>
          <DialogTitle>タスクの編集</DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            required
            id="outlined-required"
            label="タスク名"
            name="title"
            defaultValue={taskName}
            style={{ width: '100%' }}
            value={formData.title}
            onChange={handleChange}
            />
        </DialogContent>
        <DialogContent>
           <TextField
            id="outlined-multiline-static"
            label="タスク内容"
            name="content"
            multiline
            rows={4}
            defaultValue={taskContent}
            style={{ width: '100%' }}
            value={formData.content}
            onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleEdit}>編集</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}