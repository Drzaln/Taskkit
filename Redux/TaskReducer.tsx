import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortKeys, sortTasks } from "../utils/sort";
import { taskActions, taskListActions } from "./actions";
import { green } from "../constants/themes";
export interface taskList {
  [taskListId: string]: {
    name: string;
    theme: typeof green;
    tasksIds: string[];
  };
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
// TODO finish the actions below

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
} = Tasks.actions;

export default Tasks.reducer;
