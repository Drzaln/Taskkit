import React, { useCallback } from "react";
import { HoldMenuFlatList } from "react-native-hold-menu";
import TaskCard from "../components/TaskCard";
import { taskList, tasks } from "../Redux/TaskReducer";
import { findTaskListById, formatDate } from "./FindById";
export const mapThroughTasks = (
  tasks: tasks,
  taskList: taskList,
  onlyCompleted?: boolean,
  showTaskListName?: boolean
) => {
  return (
    <HoldMenuFlatList
      renderItem={(i) => {
        const item = { ...tasks[i.item], taskId: i.item };
        const TaskListName = showTaskListName
          ? taskList[item.taskListId].name
          : undefined;
        if (onlyCompleted) {
          if (item.completed) {
            return (
              <TaskCard
                taskListName={TaskListName}
                task={item}
                key={item.taskId}
                date={formatDate(item.date)}
                theme={findTaskListById(item.taskListId, taskList).theme}
              />
            );
          }
        }
        return (
          <TaskCard
            taskListName={TaskListName}
            task={item}
            key={item.taskId}
            date={formatDate(item.date)}
            theme={findTaskListById(item.taskListId, taskList).theme}
          />
        );
      }}
      data={Object.keys(tasks)}
      keyExtractor={(i) => i.taskId}
      listKey="mapping"
    />
  );
};

export const mapThroughThisDay = (tasks: tasks, taskList: taskList) => {
  return Object.keys(tasks).map((i, index) => {
    const task = { ...tasks[i], taskId: i };
    const date = formatDate(task.date);
    if (formatDate(Date.now()).date === date.date) {
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
    completed: boolean;
    date: number | null;
  }[];
  theme: {
    mainColor: string;
    textColor: string;
  };
};
export const mapThroughInList = ({ tasksIds, theme }: a) => {
  return (
    <HoldMenuFlatList
      renderItem={(i) => {
        const item = i.item;
        return (
          <TaskCard
            task={item}
            key={item.taskId}
            date={formatDate(item.date)}
            theme={theme}
          />
        );
      }}
      data={tasksIds}
      keyExtractor={(i) => i.taskId}
    />
  );
};
