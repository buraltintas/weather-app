import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action);
    },
    remove: (state, action) => {
      state.splice(action.payload.index, 1);
    },
    refresh: (state, action) => {
      state = action;
    },
  },
});

export const { add, remove, refresh } = citySlice.actions;

export default citySlice.reducer;
