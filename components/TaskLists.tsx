import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { prams } from "../StackNav";
interface TaskListProps {
  navigation: StackNavigationProp<prams>;
}
const TaskList = ({ navigation: navProps }: TaskListProps) => {
  const lists = useSelector((state: RootState) => state.TaskReducer.taskList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Lists</Text>
      {Object.keys(lists).map((listId, index) => {
        const list = { ...lists[listId], taskListId: listId };
        return (
          <View
            style={[styles.list, { backgroundColor: list.theme.mainColor }]}
            key={index}
          >
            <Pressable
              onPress={() => {
                navProps.push("Task List info", list);
              }}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 8,
                // borderRadius: 10,
              }}
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
            </Pressable>
          </View>
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
    marginVertical: 5,
    // paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 5,

    overflow: "hidden",
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
