import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import constants from "../../constants/constant";
import { RootState } from "../../Redux/store";
import { mapThroughThisDay } from "../../utils/mapThrough";
export default function MyDay() {
  const { taskList, tasks } = useSelector(
    (state: RootState) => state.TaskReducer
  );

  //NOTE - Change this if you change TaskCard
  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
        <Header />
        <View style={styles.agendaContainer}>
          {mapThroughThisDay(tasks, taskList)}
        </View>
      </ScrollView>
    </>
  );
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Day</Text>
      <Feather name={"sun"} size={75} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: constants.colors.accentColor,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
    display: "flex",
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: constants.fonts.bold,
    color: "white",
    margin: 0,
    marginBottom: 10,
  },
  textNormal: {
    fontFamily: constants.fonts.regular,
    margin: 0,
    fontSize: 18,
    color: "white",
    fontWeight: "normal",
  },
});
