import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { green } from "../constants/themes";
import { sortTasks, sortKeys } from "../utils/sort";
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
    date: number | null;
    completed: boolean;
    createdAt: number;
    important: boolean;
  };
}
export interface stateType {
  username: string;
  taskList: taskList;
  tasks: tasks;
}
const initialState: stateType = {
  username: "",
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
type premadeList = {
  list: addListPayLoad;
  task: Omit<addTaskPayload, "taskListId">;
};
const Tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    ...taskActions,
    ...taskListActions,
    ADD_TASK_PREMADE_TASKLIST: (state, action: PayloadAction<premadeList>) => {
      const taskIndex = Math.floor(
        Object.keys(state.tasks).length + Math.random() * 1000
      ).toString();
      const listIndex = Math.floor(
        Object.keys(state.taskList).length + Math.random() * 1000
      );
      state.taskList[listIndex] = {
        name: action.payload.list.name,
        theme: action.payload.list.theme,
        tasksIds: [taskIndex],
      };

      state.tasks[taskIndex] = {
        name: action.payload.task.name,
        description: action.payload.task.description,
        important: false,
        taskListId: listIndex.toString(),
        completed: false,
        date: action.payload.task.date,
        createdAt: Date.now(),
      };

      const keys = Object.keys(state.tasks);
      state.tasks = sortTasks(sortKeys(keys, state.tasks));
    },
    CHANGE_USERNAME: (state, action: PayloadAction<{ name: string }>) => {
      state.username = action.payload.name;
    },
  },
});

export const {
  ADD_TASK_LIST,
  COMPLETE_TASK,
  ADD_TASK,
  MARK_IMPORTANT,
  REMOVE_TASK,
  EDIT_TASK_LIST,
  ADD_TASK_PREMADE_TASKLIST,
  CHANGE_USERNAME,
} = Tasks.actions;

export default Tasks.reducer;
