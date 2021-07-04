import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const colorThemes = [lightGreen];

interface taskList {
  name: string;
  theme: typeof lightGreen;
  taskListId: number;
  tasksIds: number[];
}
interface tasks {
  name: string;
  description: string;
  taskId: number;
  taskListId: number;
  dateId: number | null;
}
interface calendar {
  date: Date;
  dateId: number;
  taskId: number;
  taskListId: number;
}
interface stateType {
  taskList: taskList[];
  tasks: tasks[];
  calendar: calendar[];
}
const initialState: stateType = {
  taskList: [
    {
      name: "First Task list",
      theme: lightGreen,
      taskListId: 0,
      tasksIds: [0],
    },
  ],
  tasks: [
    {
      name: "this task",
      description: "this is a description",
      taskId: 0,
      taskListId: 0,
      dateId: null,
    },
  ],
  calendar: [],
};

const Tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    ADD_TASK_LIST: (
      state,
      action: PayloadAction<
        Omit<taskList, "tasksIDs" | "taskListId" | "tasksIds">
      >
    ) => {
      const taskListData = {
        ...action.payload,
        taskListId: state.taskList.length,
        tasksIDs: [],
      };
    },
    REMOVE_TASK_LIST: (state, action: PayloadAction<taskList>) => {
      const index = state.taskList.indexOf({ ...action.payload });
      state.taskList = state.taskList.splice(index, 1);
    },
    ADD_TASK: (
      state,
      action: PayloadAction<Omit<tasks, "dateId" | "taskId">>
    ) => {
      const taskData = {
        ...action.payload,
        taskId: state.tasks.length,
        taskListId: 0,
        dateId: null,
      };
      state.tasks.push(taskData);
    },
    REMOVE_TASK: (state, action: PayloadAction<tasks>) => {
      const index = state.tasks.indexOf({ ...action.payload });
      state.tasks = state.tasks.splice(index, 1);
    },
  },
});

export const { REMOVE_TASK, ADD_TASK, ADD_TASK_LIST, REMOVE_TASK_LIST } =
  Tasks.actions;

export default Tasks.reducer;
