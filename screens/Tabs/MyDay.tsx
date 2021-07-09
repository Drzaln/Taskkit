import { Text, View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import constants from "../../constants/constant";
import TaskCard from "../../components/TaskCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  findTaskById,
  findTaskListById,
  formatDate,
} from "../../Redux/FindById";
import dayjs from "dayjs";
export default function MyDay() {
  const { taskList, tasks, calendar } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  return (
    // TODO add checkbox and animated it
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
      <Header />
      <View style={styles.agendaContainer}>
        {Object.keys(tasks).map((i, index) => {
          const task = tasks[i];
          const { theme } = findTaskListById(task.taskListId, taskList);
          let date = null;
          if (task.dateId) {
            date = formatDate(calendar[task.dateId].date).date;
          }
          if (date === dayjs().format("ddd, D MMM"))
            return (
              <TaskCard theme={theme} task={task} key={index} date={date} />
            );
        })}
      </View>
    </ScrollView>
  );
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Day</Text>
      <Feather name={"sun"} size={75} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "#317579",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
    display: "flex",
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: constants.fonts.bold,
    color: "white",
    margin: 0,
    marginBottom: 10,
  },
  textNormal: {
    fontFamily: constants.fonts.regular,
    margin: 0,
    fontSize: 18,
    color: "white",
    fontWeight: "normal",
  },
});
