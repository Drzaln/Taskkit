import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
const green = {
  mainColor: "#BAE2A7",
  textColor: "#2B6735",
};
const blue = {
  mainColor: "#A7DEE2",
  textColor: "#2B6367",
};
const pink = {
  mainColor: "#E2A7A7",
  textColor: "#672B2B",
};
const purple = {
  mainColor: "#AFA7E2",
  textColor: "#332B67",
};
const yellow = {
  mainColor: "#FEEAC3",
  textColor: "#A38787",
};
export const colorThemes = [green, purple, yellow, pink, blue];

export interface taskList {
  name: string;
  theme: typeof green;
  taskListId: number;
  tasksIds: number[];
}
export interface tasks {
  name: string;
  description: string;
  taskId: number;
  taskListId: number;
  dateId: number | null;
}
export interface calendar {
  date: number;
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
      theme: green,
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
        tasksIds: [],
      };
      state.taskList.push(taskListData);
    },
    REMOVE_TASK_LIST: (state, action: PayloadAction<taskList>) => {
      const index = state.taskList.indexOf({ ...action.payload });
      state.taskList = state.taskList.splice(index, 1);
    },
    ADD_TASK: (
      state,
      action: PayloadAction<
        Omit<Partial<calendar> & tasks, "taskId" | "dateId">
      >
    ) => {
      //

      const index = state.taskList.findIndex(
        (list) => list.taskListId === action.payload.taskListId
      );
      const taskData = {
        ...action.payload,
        taskId: state.tasks.length,
        dateId: state.calendar.length,
      };

      state.tasks.push(taskData);
      state.taskList[index].tasksIds.push(taskData.taskId);

      const date = action.payload.date;
      if (date) {
        state.calendar.push({
          date: date,
          dateId: taskData.dateId,
          taskListId: taskData.taskListId,
          taskId: taskData.taskId,
        });
      }
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
