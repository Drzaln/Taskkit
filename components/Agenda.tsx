import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { taskList, tasks } from "../Redux/TaskReducer";
import { findTaskListById, formatDate } from "../utils/FindById";
interface AgendaProps {
  taskList: taskList;
  tasks: tasks;
}

export const Agenda = ({ taskList, tasks }: AgendaProps) => {
  return (
    <View>
      {Object.keys(tasks).map((v, index) => {
        const task = tasks[v];
        if (task.date !== null && !task.completed) {
          const { date, time } = formatDate(task.date);
          const { theme } = findTaskListById(task.taskListId, taskList);
          return (
            <View style={styles.container} key={index}>
              <View
                style={[
                  styles.listIndicator,
                  { backgroundColor: theme.mainColor },
                ]}
              />
              <View>
                <View style={styles.time}>
                  <Text style={[styles.timeText, { fontSize: 16 }]}>
                    {date}
                  </Text>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
                <Text style={styles.mainText}>{task.name}</Text>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  listIndicator: {
    width: 5,
    height: "90%",
    marginRight: 10,
    borderRadius: 1,
  },
  mainText: {
    fontFamily: "Gilroy-Bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "left",
  },
  time: {
    opacity: 0.6,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.6)",
    borderStyle: "solid",
  },
  timeText: {
    fontFamily: "Gilroy-Regular",
  },
});
