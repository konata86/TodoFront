"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice"; // ユーザー情報のReducer

const store = configureStore({

  reducer: {
    user: userReducer,
  },
});

export default store;
