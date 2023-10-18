'use client'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/user-slice';
import { useRouter } from 'next/navigation';

export default function TodoAddFormDialog({ getTodos }) {

  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({"username": user, "title": "", "content": ""});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = async (e) => {
    e.preventDefault(); 
    await axios.post("http://localhost:8080/todo/add", formData).then((res) => {
      setFormData({"username": user, "title": "", "content": ""})
      getTodos()
      handleClose()
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
      <Button 
        onClick={handleClickOpen} 
        startIcon={<Add />} 
        sx={{ 
          mt: 2, 
          backgroundColor: '#DCDCDC',
          color: '#1E90FF',
          fontWeight: 'bold',
          ':hover': {
            backgroundColor: '#D3D3D3'
          }
        }
      }>
        タスクを追加
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box>
          <DialogTitle>タスクの追加</DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            required
            id="outlined-required"
            label="タスク名"
            name="title"
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
            style={{ width: '100%' }}
            value={formData.content}
            onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleAddItem}>追加</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}