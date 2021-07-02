import * as React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import constants from "../../constants/constant";
export default function MyDay() {
  return (
    <View>
      <Header />
      <Agenda />
    </View>
  );
}

const mainStyles = StyleSheet.create({});

//TODO remove scrollView from the home header
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Day</Text>
      <Feather name={"sun"} size={75} color={"white"} />
    </View>
  );
};

const Agenda = () => {
  return (
    <View style={styles.agendaContainer}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "#317579",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    display: "flex",
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
