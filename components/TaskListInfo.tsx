import { RouteProp, StackRouterOptions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import constants from "../constants/constant";
import { prams } from "../Navigation";
import { findTasksInTaskList, formatDate } from "../Redux/FindById";
import { RootState } from "../Redux/store";
import TaskCard from "./TaskCard";

type TaskListInfoProps = {
  route: RouteProp<prams, "Task List info">;
  navigation: StackNavigationProp<prams, "Task List info">;
};

const TaskListInfo = ({ route, navigation: navProps }: TaskListInfoProps) => {
  const { calendar, tasks } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  React.useLayoutEffect(() => {
    navProps.setOptions({
      title: route.params.name,
      headerStyle: { backgroundColor: route.params.theme.mainColor },
    });
  }, []);
  const { name, theme, tasksIds } = route.params;
  return (
    <View style={{ backgroundColor: theme.mainColor, flex: 1 }}>
      <View style={[styles.header, { backgroundColor: theme.mainColor }]}>
        <Text style={[styles.textNormal, { color: theme.textColor }]}>
          {tasksIds.length} Tasks
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.textColor }]}>Tasks</Text>
        {tasksIds.map((i, index) => {
          const task = tasks[i];
          let date = null;
          if (task.dateId) {
            date = formatDate(calendar[task.dateId].date);
          }
          return (
            <TaskCard task={task} theme={theme} key={index} date={date?.date} />
          );
        })}
      </View>

      <StatusBar backgroundColor={theme.mainColor} style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingTop: 10,
    // backgroundColor: "#317579",
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginBottom: 40,
    zIndex: 99,
  }, //
  title: {
    fontSize: 28,
    fontFamily: constants.fonts.bold,
    color: "white",
    margin: 0,
    marginBottom: 20,
  },
  textNormal: {
    fontFamily: constants.fonts.medium,
    fontSize: 22,
    color: "white",
  },

  container: {
    borderTopRightRadius: 60,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
});
export default TaskListInfo;
