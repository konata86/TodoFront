"use client";
import { Typography } from "@mui/material";
import React from "react";

export default function TodoTitle() {
  const options = { year: "numeric", month: "long", day: "numeric" };
  let nowDate = new Date().toLocaleDateString("ja-JP", options);

  return (
    <>
      <Typography variant="h4" mt={3} style={{ fontWeight: 'bold' }}>やることリスト</Typography>
      <Typography variant="p" color="#808080">{nowDate}</Typography>
    </>
  );
}
