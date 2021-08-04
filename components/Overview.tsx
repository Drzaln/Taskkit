import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { ReactElement } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  CompletedTaskView,
  TaskListView,
  TaskView,
} from "../screens/stack/TaskListView";
import { prams } from "../StackNav";
import { findFinishedTasks } from "../utils/FindById";
interface OverviewProps {
  navProps: StackNavigationProp<prams>;
}

const Overview = ({ navProps }: OverviewProps) => {
  const { tasks, taskList } = useSelector(
    (state: RootState) => state.TaskReducer
  );

  const tasksListCount = Object.keys(taskList).length;
  const tasksCount = Object.keys(tasks).length;
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.mainText, { marginBottom: 10, color: "black" }]}>
        Overview
      </Text>
      <Row
        mainText="Tasks"
        extraInfo={tasksCount + " Tasks"}
        icon={
          <MaterialCommunityIcons
            name="clipboard-check-multiple-outline"
            size={18}
            color="white"
          />
        }
        iconColor="#60AEDB"
        onPress={() => {
          navProps.push("Custom", { component: TaskView });
        }}
      />
      <Row
        mainText="Task Lists"
        extraInfo={`${tasksListCount} Lists, ${tasksCount} Tasks`}
        icon={<Feather name="list" color="white" size={18} />}
        iconColor="#DB6060"
        onPress={() => {
          navProps.push("Custom", { component: TaskListView });
        }}
      />
      <Row
        mainText="Finished Tasks"
        extraInfo={findFinishedTasks(tasks) + " Tasks"}
        icon={<Ionicons name="medal-outline" size={18} color="white" />}
        iconColor="#4FC76A"
        onPress={() => {
          navProps.push("Custom", { component: CompletedTaskView });
        }}
      />
    </View>
  );
};

interface RowProps extends PressableProps {
  mainText: string;
  extraInfo: string;
  icon: ReactElement;
  iconColor: string;
}

const Row = (props: RowProps) => {
  const { icon: Icon, iconColor, extraInfo, mainText } = props;

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "rgba(0,0,0,0.2)" }}
        {...props}
        style={{ flexDirection: "row", flex: 1, paddingVertical: 1 }}
      >
        <View style={[styles.icon, { backgroundColor: iconColor }]}>
          {Icon}
        </View>
        <View>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.lightText}>{extraInfo}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    overflow: "hidden",
    marginTop: 10,
    borderRadius: 20,
  },
  mainText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
  },
  lightText: {
    color: "rgba(0,0,0,0.65)",
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});

export default Overview;
