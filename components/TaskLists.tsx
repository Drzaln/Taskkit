import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { prams } from "../Navigation";
import { RootState } from "../Redux/store";
interface TaskListProps {
  navigation: StackNavigationProp<prams>;
}
const TaskList = ({ navigation: navProps }: TaskListProps) => {
  const lists = useSelector((state: RootState) => state.TaskReducer.taskList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Lists</Text>
      {Object.keys(lists).map((listId, index) => {
        const list = lists[listId];
        return (
          <RectButton
            key={index}
            onPress={() => {
              navProps.push("Task List info", list);
            }}
          >
            <View
              style={[styles.list, { backgroundColor: list.theme.mainColor }]}
            >
              <Text style={[styles.listName, { color: list.theme.textColor }]}>
                {list.name}
              </Text>
              <Text
                style={[
                  styles.listInfo,
                  { color: list.theme.textColor, opacity: 0.8 },
                ]}
              >
                {list.tasksIds.length} Tasks
              </Text>
            </View>
          </RectButton>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  listName: {
    fontFamily: "Gilroy-Medium",
    fontSize: 18,
  },
  title: {
    fontFamily: "Gilroy-Bold",
    fontSize: 20,
    color: "rgba(0,0,0,1)",
    marginBottom: 10,
  },
  listInfo: {
    fontFamily: "Gilroy-Medium",
    marginTop: 5,
    color: "rgba(0,0,0,0.7)",
  },
});
export default TaskList;
