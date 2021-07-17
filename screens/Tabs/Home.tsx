import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionButton from "../../components/ActionButton";
import Overview from "../../components/Overview";
import TaskList from "../../components/TaskLists";
import constants from "../../constants/constant";
import { prams } from "../../Navigation";
import store from "../../Redux/store";

interface HomeProps {
  navigation: StackNavigationProp<prams>;
}

export default function Home({ navigation: navProps }: HomeProps) {
  return (
    <>
      <ActionButton
        firstAction={() => {
          navProps.navigate("Add Task");
        }}
        secondAction={() => {
          navProps.navigate("Add Task List");
        }}
      />
      <ScrollView
        bounces={false}
        indicatorStyle={"white"}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <Header />
        <Overview navProps={navProps} />
        <TaskList navigation={navProps} />
        <StatusBar
          backgroundColor={constants.colors.accentColor}
          translucent={true}
        />
      </ScrollView>
    </>
  );
}

const Header = () => {
  const name = store.getState();

  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.container}>
        <View style={{ display: "flex" }}>
          <Text style={headerStyles.textNormal}>Good morning</Text>
          <Text style={headerStyles.title}>Ismael</Text>
          <Text style={headerStyles.textLight}>3 Tasks for the day</Text>
        </View>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: constants.colors.accentColor,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  title: {
    fontSize: 36,
    fontFamily: constants.fonts.bold,
    color: "white",
  },
  textNormal: {
    fontFamily: constants.fonts.bold,
    fontSize: 26,
    color: "#fff",
  },
  textLight: {
    marginTop: 10,
    fontFamily: constants.fonts.regular,
    fontSize: 18,
    color: "#fff",
    fontWeight: "400",
  },
});
