import dayjs from "dayjs";
import { calendar, taskList, tasks } from "./TaskReducer";

export const findTaskListById = (id: string, taskList: taskList) => {
  const { theme, name, tasksIds } = taskList[id];
  return {
    theme,
    name,
    tasksIds,
  };
};
export const findTaskById = (id: string, tasks: tasks[]) => {};
interface list {
  name: string;
  theme: {
    mainColor: string;
    textColor: string;
  };
  tasksIds: string[];
}
export const findTasksInTaskList = (taskList: list, tasks: tasks) => {
  const taskArr = taskList.tasksIds.map((id) => {
    return tasks[id];
  });
  return taskArr;
};

export const formatDate = (utc: number | null) => {
  if (utc) {
    const time = dayjs(utc).format("h:mm A");
    const date = dayjs(utc).format("ddd, D MMM");
    return {
      time,
      date,
    };
  }
  return {
    time: null,
    date: null,
  };
};

interface markedDates {
  [date: string]: {
    dots: { key: string; color: string }[];
  };
}

export const findMarkDates = (calendar: calendar, taskList: taskList) => {
  const sameDate: markedDates = {};
  Object.keys(calendar).map((i) => {
    const date = calendar[i];
    const dots = {
      key: date.date.toString(),
      color: taskList[date.taskListId].theme.mainColor,
    };

    const formatted = dayjs(date.date).format("YYYY-MM-DD");
    if (formatted) {
      if (sameDate[formatted] !== undefined) {
        sameDate[formatted].dots.push(dots);
      } else {
        sameDate[formatted] = { dots: [dots] };
      }
    }
  });
  return sameDate;
};
export const findFinishedTasks = (tasks: tasks) => {
  let count = 0;
  Object.keys(tasks).map((v) => {
    const task = tasks[v];
    if (task.completed) {
      count++;
    }
  });
  return count;
};
