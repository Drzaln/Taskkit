import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Text } from "react-native-svg";
import constants from "../../constants/constant";
export default function Calendars() {
  return (
    <View style={{ backgroundColor: "#317579", paddingTop: 30, flex: 1 }}>
      <View style={styles.calendarContainer}>
        <Calendar
          // Collection of dates that have to be marked. Default = {}

          theme={{
            backgroundColor: "#317579",
            calendarBackground: "#317579",
            textDayFontFamily: constants.fonts.regular,
            textMonthFontFamily: constants.fonts.regular,
            monthTextColor: "white",
            textDisabledColor: "rgba(255,255,255,0.3)",
            dayTextColor: "white",
          }}
          markedDates={{
            "2021-07-28": {
              marked: true,
              selectedColor: "blue",
            },
          }}
          enableSwipeMonths={true}
        />
      </View>
      <View style={styles.agenda}>
        <View style={styles.thumb} />
      </View>
    </View>
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
  },
  thumb: {
    marginBottom: 70,
    marginHorizontal: "auto",
    width: 36,
    height: 3,
    backgroundColor: "#C4C4C4",
    borderRadius: 2,
  },
  calendarContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});
