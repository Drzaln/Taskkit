import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskReducer";

const store = configureStore({
  reducer: { TaskReducer },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
