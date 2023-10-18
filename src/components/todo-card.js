"use client"
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, Container } from "@mui/material";
import TodoEditFormDialog from "./todo-edit-form";
import TodoDeleteFormDialog from "./todo-delete-form";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function BasicCard({ id, title, content, getTodos }) {

  return (
    <Card sx={{ minWidth: 300, mt: 2, boxShadow: 0, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Checkbox {...label} sx={{ pr: 2 }} />
          <Box>
            <Typography variant="h5" component="div" style={{ fontWeight: 'bold'}}>
              {title}
            </Typography>
            <Typography sx={{ pt: 1 }} color="text.secondary">
              {content}
            </Typography>
          </Box>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <TodoEditFormDialog
              id={id}
              taskName={title}
              taskContent={content}
              getTodos={getTodos}
            />
            <TodoDeleteFormDialog
              id={id}
              taskName={title}
              getTodos={getTodos}
            />
          </Box>
        </CardContent>
      </Box>
      <CardActions></CardActions>
    </Card>
  );
}
