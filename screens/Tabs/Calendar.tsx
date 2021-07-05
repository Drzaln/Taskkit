import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar, MultiDotMarking } from "react-native-calendars";
import { useSelector } from "react-redux";
import Agenda from "../../components/Agenda";
import constants from "../../constants/constant";
import { RootState } from "../../Redux/store";
import { taskList } from "../../Redux/TaskReducer";
function formatDate(date: any) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
export const findColor = (taskLists: taskList[], id: number) => {
  return taskLists.find((i) => i.taskListId === id)?.theme.mainColor;
};
export default function Calendars() {
  const dates = useSelector((state: RootState) => state.TaskReducer.calendar);
  const [markedDates, setMarkedDates] = React.useState<a>({
    "": { dots: [{ key: "", color: "" }] },
  });
  const taskLists = useSelector(
    (state: RootState) => state.TaskReducer.taskList
  );
  interface a {
    [date: string]: MultiDotMarking;
  }

  useEffect(() => {
    let sameDates: { date: string; taskListId: number[] }[] = [];
    dates.map((i) => {
      if (sameDates.find((x) => formatDate(x.date) === formatDate(i.date))) {
        return;
      }
      i.date;
      const findSameDates = dates.filter(
        (x) => formatDate(x.date) === formatDate(i.date)
      );
      sameDates.push({
        taskListId: findSameDates.map((id) => id.taskListId),
        date: formatDate(findSameDates[0].date),
      });
    });
    const marked = sameDates.map((i) => {
      const key = formatDate(i.date).toString();
      const val = i.taskListId.map((v, i) => ({
        key: i,
        color: findColor(taskLists, v),
      }));
      return {
        [key]: { dots: val },
      };
    });
    // @ts-ignore
    setMarkedDates(marked[0]);
  }, [dates]);
  console.log(markedDates);
  return (
    <ScrollView
      style={{ backgroundColor: "#317579" }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}
      bounces
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
        <Agenda />
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
