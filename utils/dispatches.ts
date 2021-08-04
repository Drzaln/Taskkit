import store from "../Redux/store";
import { MARK_IMPORTANT, REMOVE_TASK } from "../Redux/TaskReducer";

export const markTaskAsImportant = (taskId: string) => {
  store.dispatch(MARK_IMPORTANT({ taskId }));
};

export const deleteTask = (taskId: string) => {
  store.dispatch(REMOVE_TASK({ taskId }));
};
