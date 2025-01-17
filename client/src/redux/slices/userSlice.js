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
    getUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
