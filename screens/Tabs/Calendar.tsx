import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar, MultiDotMarking } from "react-native-calendars";
import { useSelector } from "react-redux";
import Agenda from "../../components/Agenda";
import constants from "../../constants/constant";
import { findMarkDates } from "../../Redux/FindById";
import { RootState } from "../../Redux/store";
import { taskList } from "../../Redux/TaskReducer";

export default function Calendars() {
  const dates = useSelector((state: RootState) => state.TaskReducer.calendar);
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
    setMarkedDates(findMarkDates(dates, taskLists));
  }, [dates]);
  useEffect(() => {
    console.log(markedDates);
  }, [markedDates]);
  return (
    <ScrollView
      style={{ backgroundColor: "#317579" }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}
    >
      <View style={styles.calendarContainer}>
        <Calendar
          theme={{
            backgroundColor: "#317579",
            calendarBackground: "#317579",
            textDayFontFamily: constants.fonts.regular,
            textMonthFontFamily: constants.fonts.regular,
            monthTextColor: "white",
            textDisabledColor: "rgba(255,255,255,0.3)",
            dayTextColor: "white",
          }}
          markingType={"multi-dot"}
          markedDates={markedDates}
          enableSwipeMonths={true}
        />
      </View>
      <View style={styles.agenda}>
        <View style={styles.thumb}></View>
        <Agenda taskList={taskLists} tasks={tasks} calendar={dates} />
      </View>
    </ScrollView>
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
  thumb: {
    alignSelf: "center",
    marginBottom: 70,
    width: 40,
    height: 4,
    backgroundColor: "#C4C4C4",
    borderRadius: 2,
  },
  calendarContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});
