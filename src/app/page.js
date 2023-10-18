"use client";
import SearchAppBar from "@/components/header";
import ToDo from "@/components/todo";
import TodoAddFormDialog from "@/components/todo-add-form";
import TodoTitle from "@/components/todo-title";
import { selectUser } from "@/redux/user-slice";
import { Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {

  const router = useRouter();
  const user = useSelector(selectUser);

  const [todos, setTodos] = useState([]);

  const getAllTodoItems = async () => {
    await axios
      .post("http://localhost:8080/todo/list", {"username": user })
      .then((res) => {
        if (Object.keys(res.data.data).length !== 0) {
          setTodos(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTodoItems();
  }, [])

  useEffect(() => {
    // ユーザーがログインしていない場合、ログインページにリダイレクト
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      {!user ? (
        <></>
      ) : (
        <>
          <header>
            <SearchAppBar />
          </header>
          <main>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TodoTitle />
              <TodoAddFormDialog getTodos={getAllTodoItems} />
              <ToDo todos={todos} getTodos={getAllTodoItems} />
            </Container>
          </main>
        </>
      )}
    </>
  );
}
