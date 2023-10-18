"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // 初期値はnull
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
