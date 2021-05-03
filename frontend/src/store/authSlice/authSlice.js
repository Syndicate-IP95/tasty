import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: localStorage.getItem("tasty_token") || null,
    name: null,
    surname: null,
    email: null,
  },
  reducers: {
    successLogin: (state, action) => {
      localStorage.setItem("tasty_token", action.payload.token);

      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    onLogOut: (state, action) => {
      localStorage.removeItem("tasty_token");

      state.name = null;
      state.surname = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { successLogin, onLogOut } = authSlice.actions;

export default authSlice.reducer;
