import * as React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FullRound } from "../../components/Headers";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { TextForm, DateForm } from "../../components/Forms";
import constants from "../../constants/constant";
import { RectButton } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
export default function AddTask() {
  const [date, setDate] = React.useState(new Date());
  return (
    <View
      style={{ backgroundColor: constants.colors.backgroundColor, flex: 1 }}
    >
      <View style={styles.header}>
        <View style={{ display: "flex", marginTop: 35 }}>
          <Text style={styles.title}>Create New Task</Text>
          <Text style={styles.textLight}>Name</Text>

          <TextForm
            color={"#fff"}
            style={{
              marginBottom: 15,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
          <Text style={styles.textLight}>Due date</Text>

          <DateForm
            mode={"date"}
            color={"#fff"}
            date={date}
            setDate={setDate}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <DateForm
          date={date}
          setDate={setDate}
          color={"white"}
          mode={"time"}
          style={{ backgroundColor: "rgba(255,255,255,0.3)", width: 80 }}
        />
        <Text style={[styles.textLight, { color: "white" }]}>Description</Text>
        <TextForm
          color={"#fff"}
          multiline={true}
          numberOfLines={3}
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        />

        <RectButton style={styles.button}>
          <Entypo name={"plus"} color={"white"} size={34} />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingHorizontal: 20,
    backgroundColor: "#317579",
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: constants.fonts.bold,
    color: "white",
    marginBottom: 10,
  },
  textLight: {
    fontFamily: constants.fonts.regular,
    marginTop: 10,
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  categoryContainer: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 15,
  },
  category: {
    marginTop: 20,
    fontSize: 16,
    color: "#808080",
  },

  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: constants.colors.accentColor,
    position: "absolute",
    bottom: 84,
    right: 20,
  },
});
