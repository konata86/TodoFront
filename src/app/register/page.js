"use client";
import SearchAppBar from "@/components/header";
import ToDo from "@/components/todo";
import TodoAddFormDialog from "@/components/todo-add-form";
import TodoTitle from "@/components/todo-title";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useRouter, redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Register() {

  const [formData, setFormData] = useState({username: ""});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await axios.post("http://localhost:8080/register/new", formData).then((res) => {
        router.push("/login");
    }).catch((e) => {
        console.log(e);
    })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="User Name"
                name="username"
                autoComplete="email"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Sign In
              </Button> 
              <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/" variant="body">
                  {"ログイン画面に戻る"}
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Container>
    </>
  );
}