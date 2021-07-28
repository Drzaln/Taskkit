import { PayloadAction } from "@reduxjs/toolkit";
import { stateType } from "../TaskReducer";
import { green } from "../../constants/themes";

interface addListPayLoad {
  name: string;
  theme: typeof green;
}
export const ADD_TASK_LIST = (
  state: stateType,
  action: PayloadAction<addListPayLoad>
) => {
  const index = Math.floor(
    Object.keys(state.taskList).length + Math.random() * 1000
  );
  state.taskList[index] = {
    name: action.payload.name,
    theme: action.payload.theme,
    tasksIds: [],
  };
};