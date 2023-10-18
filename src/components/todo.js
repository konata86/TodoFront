import * as React from "react";
import BasicCard from "./todo-card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/user-slice";

export default function ToDo({todos, getTodos}) {
  return (
    <>
      {todos.map((todo) => (
        <BasicCard key={todo.id} id={todo.id} title={todo.title} content={todo.content} getTodos={getTodos} />
      ))}
    </>
  );
}
