import { PayloadAction } from "@reduxjs/toolkit";
import { sortTasks, sortKeys } from "../../utils/sort";
import { stateType } from "../TaskReducer";

interface addTaskPayload {
  name: string;
  description: string;
  taskListId: string;
  date: number | null;
}
export const ADD_TASK = (
  state: stateType,
  action: PayloadAction<addTaskPayload>
) => {
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

  const keys = Object.keys(state.tasks);
  state.tasks = sortTasks(sortKeys(keys, state.tasks));
  state.taskList[list].tasksIds = sortKeys(
    state.taskList[list].tasksIds,
    state.tasks
  ).sorted;
};
export const COMPLETE_TASK = (
  state: stateType,
  action: PayloadAction<{ taskId: string; value: boolean }>
) => {
  if (state.tasks[action.payload.taskId])
    state.tasks[action.payload.taskId].completed = action.payload.value;
};
export const MARK_IMPORTANT = (
  state: stateType,
  action: PayloadAction<{ taskId: string }>
) => {
  const { taskId } = action.payload;
  const prev = state.tasks[taskId].important;
  state.tasks[taskId].important = !prev;
};

export const REMOVE_TASK = (
  state: stateType,
  action: PayloadAction<{ taskId: string }>
) => {
  const listId = state.tasks[action.payload.taskId].taskListId;
  state.taskList[listId].tasksIds = state.taskList[listId].tasksIds.filter(
    (i) => i !== action.payload.taskId
  );
  delete state.tasks[action.payload.taskId];
  // TODO remove task from calendar
};
