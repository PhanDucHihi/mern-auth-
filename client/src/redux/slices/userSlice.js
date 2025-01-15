import { createSlice, current } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  currentUser: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state, action) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
