import { tasks } from "../Redux/TaskReducer";
type sortTa = {
  sorted: string[];
  tasks: tasks;
};
export const sortTasks = ({ sorted, tasks }: sortTa) => {
  let newTasks: typeof tasks = {};
  sorted.map((i) => {
    newTasks[i] = tasks[i];
  });
  return newTasks;
};
export const sortKeys = (keys: string[], tasks: tasks) => {
  let byDate: string[] = [];
  let byCreated: string[] = [];
  keys.map((i) => {
    const task = { date: tasks[i].date, taskId: i };
    if (task.date) {
      const len = byDate.length;
      if (len === 0) {
        byDate.push(task.taskId);
      } else {
        byDate.map((key, index) => {
          const taskByDate = { date: tasks[key].date, taskId: key };
          //@ts-ignore
          if (taskByDate.date > task.date) {
            byDate.splice(index, 0, task.taskId);
          } else {
            if (index === len - 1) {
              byDate.push(task.taskId);
            }
          }
        });
      }
    } else {
      byCreated.push(task.taskId);
    }
  });
  const sorted = [...byDate, ...byCreated];
  return { sorted, tasks };
};
