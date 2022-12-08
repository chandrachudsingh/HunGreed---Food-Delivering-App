import { configureStore } from "@reduxjs/toolkit";
import newItemReducer from "./reducers/createItemSlice";

const store = configureStore({
  reducer: {
    newItem: newItemReducer,
  },
});

export default store;
