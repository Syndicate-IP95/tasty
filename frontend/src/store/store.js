import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import uiReducer from "./uiSlice/uiSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});
