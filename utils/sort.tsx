import { tasks } from "../Redux/TaskReducer";

export const sort = (keys: string[], tasks: tasks) => {
  const byDate: string[] = [];
  const byCreatedAt: string[] = [];
  keys.map((i) => {
    const task = { ...tasks[i], taskId: i };
    if (task.date) {
      for (let j = 0; j < byDate.length; j++) {
        const byDateTask = { ...tasks[byDate[j]], taskId: byDate[j] };
        //@ts-ignore
        if (byDateTask.date < task.date) {
          byDate.splice(j, 0, byDateTask.taskId);
          continue;
        }
      }
    } else {
      for (let j = 0; j < byCreatedAt.length; j++) {
        const byTask = { ...tasks[byCreatedAt[j]], taskId: byCreatedAt[j] };
        if (byTask.createdAt < task.createdAt) {
          byCreatedAt.splice(j, 0, byTask.taskId);
          continue;
        }
      }
    }
  });
  return [...byDate, ...byCreatedAt];
};
