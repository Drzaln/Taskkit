import { Feather, MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import constants, { noShadowHeader } from "../constants/constant";
import { RootState } from "../Redux/store";
import { prams } from "../StackNav";
import { findTasksInTaskList } from "../utils/FindById";
import { mapThroughInList } from "../utils/mapThrough";
import { ActionButton } from "./ActionButton";
import EditTaskList from "./EditTaskList";

type TaskListInfoProps = {
  route: RouteProp<prams, "Task List info">;
  navigation: StackNavigationProp<prams, "Task List info">;
};

const TaskListInfo = ({ route, navigation: navProps }: TaskListInfoProps) => {
  const { name, theme, taskListId } = route.params;
  const [showEditMenu, setShowEditMenu] = React.useState(false);
  const { tasks, taskList } = useSelector((state: RootState) => state);
  React.useLayoutEffect(() => {
    navProps.setOptions({
      headerStyle: {
        ...noShadowHeader,
        backgroundColor: theme.mainColor,
      },
    });
  }, []);
  const tasksIds = findTasksInTaskList(taskListId, tasks, taskList);
  const buttonColor =
    theme.textColor === "#fff" ? "rgba(0,0,0,0.3)" : theme.textColor;
  return (
    <>
      <EditTaskList
        navProps={navProps}
        taskListName={name}
        taskListId={taskListId}
        visible={showEditMenu}
        setVisible={setShowEditMenu}
        taskListTheme={theme}
      />
      <View style={styles.extra}>
        <ActionButton
          style={{ backgroundColor: buttonColor }}
          onPress={() => {
            navProps.push("Add Task", {
              backgroundColor: theme.mainColor,
              textColor: theme.textColor,
              taskListId: taskListId,
            });
          }}
          rippleColor="rgba(255,255,255,0.4)"
        >
          <MaterialIcons name="add-task" size={24} color="white" />
        </ActionButton>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: theme.mainColor,
          flexGrow: 1,
        }}
      >
        <View style={[styles.header, { backgroundColor: theme.mainColor }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.title, { color: theme.textColor }]}>{name}</Text>
            <View style={{ padding: 4 }}>
              <Pressable
                android_ripple={{
                  color: "rgba(55,55,55,0.5)",
                  borderless: true,
                }}
                onPress={() => setShowEditMenu(true)}
              >
                <Feather name="edit" size={25} color={theme.textColor} />
              </Pressable>
            </View>
          </View>
          <Text style={[styles.textNormal, { color: theme.textColor }]}>
            {tasksIds.length} {tasksIds.length === 1 ? "Task" : "Tasks"}
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
export default TaskListInfo;
interface ActionButtonProps {
  theme: {
    mainColor: string;
    textColor: string;
  };
  buttonColor: string;
  navProps: StackNavigationProp<prams, "Task List info">;
  taskListId: string;
}
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
  extra: {
    position: "absolute",
    bottom: 84,
    right: 20,
    zIndex: 99,
    marginBottom: 10,
  },
});
