import { createSlice } from "@reduxjs/toolkit";
import { green } from "../constants/themes";
import { taskActions, taskListActions } from "./actions";
export interface taskList {
  [taskListId: string]: {
    name: string;
    theme: typeof green;
    tasksIds: string[];
  };
}
export interface taskType {
  name: string;
  description: string;
  taskListId: string;
  dateId: number | null;
  date: number | null;
  completed: boolean;
  createdAt: number;
  important: boolean;
}
export interface tasks {
  [taskId: string]: {
    name: string;
    description: string;
    taskListId: string;
    dateId: number | null;
    date: number | null;
    completed: boolean;
    createdAt: number;
    important: boolean;
  };
}
export interface stateType {
  taskList: taskList;
  tasks: tasks;
}
const initialState: stateType = {
  tasks: {},
  taskList: {},
};

interface addListPayLoad {
  name: string;
  theme: typeof green;
}
interface addTaskPayload {
  name: string;
  description: string;
  taskListId: string;
  date: number | null;
}

const Tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    ...taskActions,
    ...taskListActions,
  },
});

export const {
  ADD_TASK_LIST,
  COMPLETE_TASK,
  ADD_TASK,
  MARK_IMPORTANT,
  REMOVE_TASK,
  EDIT_TASK_LIST,
} = Tasks.actions;

export default Tasks.reducer;
