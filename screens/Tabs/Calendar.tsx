import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar, MultiDotMarking } from "react-native-calendars";
import { useSelector } from "react-redux";
import Agenda from "../../components/Agenda";
import constants from "../../constants/constant";
import { findMarkDates } from "../../utils/FindById";
import { RootState } from "../../Redux/store";
import { taskList } from "../../Redux/TaskReducer";

export default function Calendars() {
  const [markedDates, setMarkedDates] = React.useState<{
    [date: string]: MultiDotMarking;
  }>({
    "": { dots: [{ key: "first", color: "" }] },
  });
  const taskLists = useSelector(
    (state: RootState) => state.TaskReducer.taskList
  );
  const tasks = useSelector((state: RootState) => state.TaskReducer.tasks);
  useEffect(() => {
    setMarkedDates(findMarkDates(tasks, taskLists));
  }, [tasks]);
  return (
    <>
      {/* <View style={styles.header} /> */}
      <ScrollView
        style={{ backgroundColor: constants.colors.accentColor }}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}
      >
        <View style={styles.calendarContainer}>
          <Calendar
            theme={{
              backgroundColor: constants.colors.accentColor,
              calendarBackground: constants.colors.accentColor,
              textDayFontFamily: constants.fonts.regular,
              arrowColor: "white",
              todayTextColor: "rgba(0,0,0,0.5)",
              textMonthFontFamily: constants.fonts.regular,
              monthTextColor: "white",
              textDisabledColor: "rgba(255,255,255,0.3)",
              dayTextColor: "white",
              selectedDayTextColor: "black",
            }}
            markingType={"multi-dot"}
            markedDates={markedDates}
            // enableSwipeMonths={true}
          />
        </View>
        <View style={styles.agenda}>
          <View style={styles.thumb}></View>
          <Agenda taskList={taskLists} tasks={tasks} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  agenda: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    paddingBottom: 70,
  },
  header: {
    height: 70,
    backgroundColor: constants.colors.accentColor,
    width: "100%",
  },
  thumb: {
    alignSelf: "center",
    marginBottom: 30,
    width: 40,
    height: 4,
  },
  calendarContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});
