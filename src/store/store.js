import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./citySlice";

const store = configureStore({
  reducer: {
    cities: citySlice,
  },
});

export default store;
