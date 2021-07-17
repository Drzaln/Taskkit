import * as React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskCard from "../../components/TaskCard";
import CheckBox from "../../components/CheckBox";
import { colorThemes } from "../../Redux/TaskReducer";
export default function Profile() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top }}>
      {/* <View style={styles.header}>
        <TaskCard
          task={{
            name: "task",
            dateId: null,
            description: ";aojdklasdf",
            completed: false,
            taskListId: "0",
          }}
          theme={colorThemes[0]}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",

    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
