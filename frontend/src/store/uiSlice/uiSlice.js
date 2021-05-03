import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    showMenu: false,
  },
  reducers: {
    changeMenuShowing: (state, action) => {
      state.showMenu = action.payload;
    },
  },
});

export const { changeMenuShowing } = uiSlice.actions;

export default uiSlice.reducer;
