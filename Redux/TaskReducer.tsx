import { createSlice } from "@reduxjs/toolkit";

const lightGreen = {
  mainColor: "#BAE2A7",
  secondaryColor: "#A6E2BA",
  mainText: "#F2F2F2",
  darkText: "#2B6735",
  lightText: "#539D5F",
  checkBox: {
    borderColor: "#21994A",
    backgroundColor: "C2F1D2",
  },
};

interface stateType {
  taskList: {
    name: string;
    theme: typeof lightGreen;
    taskListId: number;
  }[];
  tasks?: {
    name: string;
    date?: Date;
    description: string;
    TaskList: string;
    taskId: number;
  }[];
  profile: {
    name: string;
    bio: string;
  };
}
const initialState: stateType = {
  profile: {
    name: "Ismael Karim",
    bio: "Developer",
  },
  taskList: [
    { name: "fasdf", theme: lightGreen, taskListId: 1 },
    { name: "crypto", theme: lightGreen, taskListId: 2 },
  ],
  tasks: [
    {
      name: "this task",
      description: "this is a description",
      TaskList: "crypto",
      taskId: 1,
    },
  ],
};
const Tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    ADD_TASK_LIST: (state, action) => {},
    REMOVE_TASK_LIST: (state, action) => {},
    ADD_TASK: (state, action) => {},
    REMOVE_TASK: (state, action) => {},
    EDIT_PROFILE: (state, action) => {},
  },
});

export const { REMOVE_TASK, ADD_TASK } = Tasks.actions;

export default Tasks.reducer;
