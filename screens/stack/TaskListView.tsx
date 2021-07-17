import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import TaskLists from "../../components/TaskLists";
import constants from "../../constants/constant";
import { prams } from "../../Navigation";
import { findFinishedTasks } from "../../Redux/FindById";
import { RootState } from "../../Redux/store";
import { mapThroughTasks } from "../../utils/mapThrough";
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
    <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
      <TaskLists navigation={navProps} />
    </ScrollView>
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      {keys.length === 0 ? (
        <Text>There's no Tasks</Text>
      ) : (
        mapThroughTasks(tasks, taskList, calendar, false, true)
      )}
    </ScrollView>
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
  const keys = findFinishedTasks(tasks);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      {keys === 0 ? (
        <Text>There's No finished Tasks</Text>
      ) : (
        mapThroughTasks(tasks, taskList, calendar, true, true)
      )}
    </ScrollView>
  );
};
