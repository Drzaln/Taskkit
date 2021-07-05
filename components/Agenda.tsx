import dayjs from "dayjs";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { findColor } from "../screens/Tabs/Calendar";
interface AgendaProps {}

export const Agenda = (props: AgendaProps) => {
  const { calendar, taskList, tasks } = useSelector(
    (state: RootState) => state.TaskReducer
  );
  if (calendar.length !== 0) {
    return (
      <View>
        {tasks.map((task) => {
          const color = taskList.find((x) => x.taskListId === task.taskListId)
            ?.theme.mainColor;
          const dateNumber = calendar.find(
            (x) => x.dateId === task.dateId
          )?.date;
          const time = dayjs(dateNumber).format("h:mm A");
          const date = dayjs(dateNumber).format("ddd, D MMM");
          return (
            <View style={styles.container}>
              <View
                style={[styles.listIndicator, { backgroundColor: color }]}
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
        })}
      </View>
    );
  }
  return <View></View>;
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
