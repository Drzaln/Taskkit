import React, { useCallback } from "react";
import TaskCard from "../components/TaskCard";
import { findTaskListById, formatDate } from "./FindById";
import { taskList, tasks } from "../Redux/TaskReducer";
import { HoldMenuFlatList } from "react-native-hold-menu";
export const mapThroughTasks = (
  tasks: tasks,
  taskList: taskList,
  onlyCompleted?: boolean,
  showTaskListName?: boolean
) => {
  const renderItem = useCallback(
    (i) => {
      const item = { ...tasks[i.item], taskId: i.item };
      const TaskListName = showTaskListName
        ? taskList[item.taskListId].name
        : undefined;
      if (onlyCompleted) {
        return item.completed ? (
          <TaskCard
            taskListName={TaskListName}
            task={item}
            key={item.taskId}
            date={formatDate(item.date)}
            theme={findTaskListById(item.taskListId, taskList).theme}
          />
        ) : null;
      } else {
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
    },
    [tasks]
  );
  return (
    <HoldMenuFlatList
      renderItem={renderItem}
      data={Object.keys(tasks)}
      keyExtractor={(i) => i.id}
      maxToRenderPerBatch={4}
      windowSize={5}
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
    dateId: number | null;
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
            key={i.index}
            date={formatDate(item.date)}
            theme={theme}
          />
        );
      }}
      data={tasksIds}
      keyExtractor={(i) => i.id}
    />
  );
};
