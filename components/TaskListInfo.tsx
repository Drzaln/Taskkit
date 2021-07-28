import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import constants from "../constants/constant";
import { prams } from "../Navigation";
import { RootState } from "../Redux/store";
import { findTasksInTaskList } from "../utils/FindById";
import { mapThroughInList } from "../utils/mapThrough";

type TaskListInfoProps = {
  route: RouteProp<prams, "Task List info">;
  navigation: StackNavigationProp<prams, "Task List info">;
};

const TaskListInfo = ({ route, navigation: navProps }: TaskListInfoProps) => {
  const { name, theme, taskListId } = route.params;
  const { tasks, taskList } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  React.useLayoutEffect(() => {
    navProps.setOptions({
      title: name,
      headerStyle: { backgroundColor: theme.mainColor },
    });
  }, []);
  const tasksIds = findTasksInTaskList(taskListId, tasks, taskList);
  const buttonColor =
    theme.textColor === "#fff" ? "rgba(0,0,0,0.3)" : theme.textColor;
  return (
    <>
      <View
        style={[
          styles.floating,
          styles.button,
          { backgroundColor: theme.mainColor },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={() => {
            navProps.push("Add Task", {
              backgroundColor: theme.mainColor,
              textColor: theme.textColor,
              taskListId: taskListId,
            });
          }}
          android_ripple={{
            borderless: true,
            color: "rgba(255,255,255,0.4)",
            radius: 30,
          }}
        >
          <MaterialIcons name="add-task" size={24} color="white" />
        </Pressable>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: theme.mainColor,
          flexGrow: 1,
        }}
      >
        <View style={[styles.header, { backgroundColor: theme.mainColor }]}>
          <Text style={[styles.textNormal, { color: theme.textColor }]}>
            {tasksIds.length} Tasks
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.textColor }]}>Tasks</Text>
          {mapThroughInList({ tasksIds, theme })}
        </View>

        <StatusBar backgroundColor={theme.mainColor} style="auto" />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingTop: 10,
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
    paddingBottom: 70,
  },
  floating: {
    position: "absolute",
    bottom: 84,
    right: 20,
    zIndex: 99,
  },
  button: {
    backgroundColor: "#7A6174",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TaskListInfo;
