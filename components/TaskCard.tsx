import { StyleSheet, Text } from "react-native";
import React from "react";
import { View } from "react-native";
import { taskList, tasks } from "../Redux/TaskReducer";

interface TaskCardProps {
  task: {
    name: string;
    description: string;
    taskListId: string;
    dateId: number | null;
    completed: boolean;
  };
  date?: string | null;
  theme: {
    mainColor: string;
    textColor: string;
  };
}
const TaskCard = ({ task, date, theme }: TaskCardProps) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.mainColor }]}>
      <Text style={[styles.name, { color: theme.textColor }]}>{task.name}</Text>
      {date && (
        <Text style={[styles.date, { color: theme.textColor }]}>{date}</Text>
      )}
    </View>
  );
};
export default TaskCard;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    minHeight: 70,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Gilroy-Medium",
  },
  date: {
    fontSize: 13,
    fontFamily: "Gilroy-Regular",
    opacity: 0.8,
  },
});
