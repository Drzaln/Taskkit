import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TaskLists from "../../components/TaskLists";
import { prams } from "../../Navigation";
import { RootState } from "../../Redux/store";
import TaskCard from "../../components/TaskCard";
import {
  findFinishedTasks,
  findTaskListById,
  formatDate,
} from "../../Redux/FindById";
import constants from "../../constants/constant";
interface TaskListViewProps {
  navProps: StackNavigationProp<prams>;
}
export const TaskListView = ({ navProps }: TaskListViewProps) => {
  React.useLayoutEffect(() => {
    navProps.setOptions({
      title: "Task Lists",
    });
  }, []);
  return (
    <View>
      <TaskLists navigation={navProps} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: constants.fonts.medium,
  },
});

export const TaskView = ({ navProps }: TaskListViewProps) => {
  React.useLayoutEffect(() => {
    navProps.setOptions({
      title: "Tasks",
    });
  }, []);
  const { tasks, calendar, taskList } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  const keys = Object.keys(tasks);
  return (
    <View style={styles.container}>
      {keys.length === 0 && <Text>There's no Tasks</Text>}
      {keys.map((i, index) => {
        const task = tasks[i];
        let date = null;
        if (task.dateId) {
          date = formatDate(calendar[task.dateId].date).date;
        }
        return (
          <TaskCard
            key={index}
            task={task}
            date={date}
            theme={findTaskListById(task.taskListId, taskList).theme}
          />
        );
      })}
    </View>
  );
};
export const CompletedTaskView = ({ navProps }: TaskListViewProps) => {
  React.useLayoutEffect(() => {
    navProps.setOptions({
      title: "Tasks",
    });
  }, []);
  const { tasks, calendar, taskList } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  const keys = Object.keys(tasks);
  const completedTasks = findFinishedTasks(tasks);
  return (
    <View style={styles.container}>
      {completedTasks === 0 && (
        <Text style={styles.text}>There's no Finished Tasks</Text>
      )}
      {keys.map((i, index) => {
        const task = tasks[i];
        let date = null;
        if (task.dateId) {
          date = formatDate(calendar[task.dateId].date).date;
        }
        if (task.completed) {
          return (
            <TaskCard
              key={index}
              task={task}
              date={date}
              theme={findTaskListById(task.taskListId, taskList).theme}
            />
          );
        }
      })}
    </View>
  );
};
