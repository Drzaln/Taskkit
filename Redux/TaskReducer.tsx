import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortKeys, sortTasks } from "../utils/sort";
import { green } from "./themes";
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
export interface calendar {
  [dateId: string]: { date: number; taskListId: string };
}
interface stateType {
  taskList: taskList;
  tasks: tasks;
  calendar: calendar;
}
const initialState: stateType = {
  tasks: {},
  taskList: {},
  calendar: {},
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
    ADD_TASK_LIST: (state, action: PayloadAction<addListPayLoad>) => {
      const index = Math.floor(
        Object.keys(state.taskList).length + Math.random() * 1000
      );
      state.taskList[index] = {
        name: action.payload.name,
        theme: action.payload.theme,
        tasksIds: [],
      };
    },
    //
    //
    REMOVE_TASK_LIST: (
      state,
      action: PayloadAction<{ taskListId: number }>
    ) => {},
    //
    //
    ADD_TASK: (state, action: PayloadAction<addTaskPayload>) => {
      const index = Math.floor(
        Object.keys(state.tasks).length + Math.random() * 1000
      ).toString();
      const list = action.payload.taskListId;
      state.tasks[index] = {
        name: action.payload.name,
        description: action.payload.description,
        important: false,
        taskListId: list,
        completed: false,
        date: action.payload.date,
        createdAt: Date.now(),
        dateId: action.payload.date === null ? null : parseInt(index),
      };
      state.taskList[list].tasksIds.push(index);

      if (action.payload.date) {
        state.calendar[index] = {
          date: action.payload.date,
          taskListId: action.payload.taskListId,
        };
      }
      const keys = Object.keys(state.tasks);
      state.tasks = sortTasks(sortKeys(keys, state.tasks));
      state.taskList[list].tasksIds = sortKeys(
        state.taskList[list].tasksIds,
        state.tasks
      ).sorted;
    },

    REMOVE_TASK: (state, action: PayloadAction<{ taskId: string }>) => {
      const listId = state.tasks[action.payload.taskId].taskListId;
      state.taskList[listId].tasksIds = state.taskList[listId].tasksIds.filter(
        (i) => i !== action.payload.taskId
      );
      delete state.tasks[action.payload.taskId];
      // TODO remove task from calendar
    },
    COMPLETE_TASK: (
      state,
      action: PayloadAction<{ taskId: string; value: boolean }>
    ) => {
      if (state.tasks[action.payload.taskId])
        state.tasks[action.payload.taskId].completed = action.payload.value;
    },
    MARK_IMPORTANT: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      const prev = state.tasks[taskId].important;
      state.tasks[taskId].important = !prev;
      console.log(state.tasks[taskId].important);
    },
  },
});

export const {
  REMOVE_TASK,
  ADD_TASK,
  MARK_IMPORTANT,
  ADD_TASK_LIST,
  REMOVE_TASK_LIST,
  COMPLETE_TASK,
} = Tasks.actions;

export default Tasks.reducer;
