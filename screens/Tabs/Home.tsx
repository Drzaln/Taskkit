import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FullRound } from "../../components/Headers";
import constants from "../../constants/constant";
import store from "../../Redux/store";

export default function Home() {
  return <Header />;
}

const Header = () => {
  const name = store.getState();

  return (
    <ScrollView>
      <View style={headerStyles.header}>
        <View style={headerStyles.container}>
          <View style={headerStyles.profile} />
          <View style={{ display: "flex" }}>
            <Text style={headerStyles.textNormal}>Good morning</Text>
            <Text style={headerStyles.title}>
              {name.TaskReducer.profile.name}
            </Text>
            <Text style={headerStyles.textLight}>3 Tasks for the day</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "#317579",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
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
    margin: 0,
  },
  textNormal: {
    fontFamily: constants.fonts.regular,
    margin: 0,
    fontSize: 18,
    color: "#E0DADA",
    fontWeight: "normal",
  },
  textLight: {
    marginTop: 10,
    fontFamily: constants.fonts.regular,
    fontSize: 18,
    color: "#E0DADA",
    fontWeight: "400",
  },
  profile: {
    width: 70,
    height: 70,
    borderColor: "#E0DADA",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 50,
  },
});
