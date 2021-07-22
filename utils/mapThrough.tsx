import React from "react";
import TaskCard from "../components/TaskCard";
import { findTaskListById, formatDate } from "../Redux/FindById";
import { calendar, taskList, tasks } from "../Redux/TaskReducer";
export const mapThroughTasks = (
  tasks: tasks,
  taskList: taskList,
  onlyCompleted?: boolean,
  showTaskListName?: boolean
) => {
  const keys = Object.keys(tasks);
  return keys.map((i, index) => {
    const task = { ...tasks[i], taskId: i };
    const date = formatDate(task.date);
    const TaskListName = showTaskListName
      ? taskList[task.taskListId].name
      : undefined;

    if (onlyCompleted) {
      if (task.completed) {
        return (
          <TaskCard
            taskListName={TaskListName}
            key={index}
            task={task}
            date={date}
            theme={findTaskListById(task.taskListId, taskList).theme}
          />
        );
      }
    } else {
      return (
        <TaskCard
          key={index}
          taskListName={TaskListName}
          task={task}
          date={date}
          theme={findTaskListById(task.taskListId, taskList).theme}
        />
      );
    }
  });
};

export const mapThroughThisDay = (tasks: tasks, taskList: taskList) => {
  return Object.keys(tasks).map((i, index) => {
    const task = { ...tasks[i], taskId: i };
    const date = formatDate(task.date);
    if (formatDate(Date.now()).date === date.date) {
      console.log(task);
      return (
        <TaskCard
          key={index}
          taskListName={taskList[task.taskListId].name}
          task={task}
          date={date}
          theme={findTaskListById(task.taskListId, taskList).theme}
        />
      );
    }
  });
};
type a = {
  tasksIds: {
    taskId: string;
    name: string;
    description: string;
    taskListId: string;
    dateId: number | null;
    completed: boolean;
    date: number | null;
  }[];
  calendar: calendar;
  theme: {
    mainColor: string;
    textColor: string;
  };
};
export const mapThroughInList = ({ tasksIds, theme }: a) => {
  return tasksIds.map((task, index) => {
    const date = formatDate(task.date);
    return <TaskCard task={task} theme={theme} key={index} date={date} />;
  });
};
