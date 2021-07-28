import dayjs from "dayjs";
import { taskList, tasks } from "../Redux/TaskReducer";

export const findTaskListById = (id: string, taskList: taskList) => {
  const { theme, name, tasksIds } = taskList[id];
  return {
    theme,
    name,
    tasksIds,
  };
};
export const findTaskById = (id: string, tasks: tasks[]) => {};

export const findTasksInTaskList = (
  taskListId: string,
  tasks: tasks,
  taskLists: taskList
) => {
  const taskList = taskLists[taskListId];
  const taskArr = taskList.tasksIds.map((i) => {
    const task = tasks[i];
    return { ...task, taskId: i };
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
    selected?: boolean;
    selectedColor?: string;
    marked?: boolean;
  };
}

export const findMarkDates = (tasks: tasks, taskList: taskList) => {
  // const sameDate: markedDates = {};
  // Object.keys(calendar).map((i) => {
  //   const date = calendar[i];
  //   const dots = {
  //     key: date.date.toString(),
  //     color: taskList[date.taskListId].theme.mainColor,
  //   };

  //   const formatted = dayjs(date.date).format("YYYY-MM-DD");
  //   if (formatted) {
  //     if (sameDate[formatted] !== undefined) {
  //       sameDate[formatted].dots.push(dots);
  //     } else {
  //       sameDate[formatted] = { dots: [dots] };
  //     }
  //   }
  // });
  // return sameDate;
  const thisDay = dayjs(Date.now()).format("YYYY-MM-DD");
  const sameDate: markedDates = {
    [thisDay]: {
      dots: [],
      selected: true,
      selectedColor: "#fff",
    },
  };
  const keys = Object.keys(tasks);
  keys.map((i) => {
    const task = tasks[i];
    if (task.date) {
      const formatted = dayjs(task.date).format("YYYY-MM-DD");
      const dots = {
        key: task.date.toString(),
        color: findTaskListById(task.taskListId, taskList).theme.mainColor,
      };
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
