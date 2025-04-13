import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, isAdmin: false, username: "" },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin || false;
      state.username = action.payload.username || "";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.username = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
