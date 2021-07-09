import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    completed: boolean;
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
  taskList: {
    ["0"]: {
      name: "First Task list",
      theme: green,
      tasksIds: ["0"],
    },
  },
  tasks: {
    ["0"]: {
      name: "this task",
      description: "this is a description",
      taskListId: "0",
      dateId: null,
      completed: false,
    },
  },
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
        Object.keys(state.taskList).length * Math.random() * 1000
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
        Object.keys(state.tasks).length * Math.random() * 1000
      );
      console.log(index);
      state.tasks[index] = {
        name: action.payload.name,
        description: action.payload.description,
        taskListId: action.payload.taskListId,
        completed: false,
        dateId: index,
      };
      state.taskList[action.payload.taskListId].tasksIds.push(index.toString());
      if (action.payload.date) {
        state.calendar[index] = {
          date: action.payload.date,
          taskListId: action.payload.taskListId,
        };
      }
    },
    REMOVE_TASK: (state, action: PayloadAction<{ taskId: number }>) => {},
    COMPLETE_TASK: (state, action: PayloadAction<{ taskId: number }>) => {},
  },
});

export const { REMOVE_TASK, ADD_TASK, ADD_TASK_LIST, REMOVE_TASK_LIST } =
  Tasks.actions;

export default Tasks.reducer;
