import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ActionButton from "../../components/ActionButton";
import { DateForm, TextForm } from "../../components/Forms";
import constants from "../../constants/constant";
import { ADD_TASK } from "../../Redux/TaskReducer";
import { Feather } from "@expo/vector-icons";
interface AddTaskProps {
  navigation: StackNavigationProp<any>;
}

export default function AddTask({ navigation: navProps }: AddTaskProps) {
  React.useEffect(
    () =>
      navProps.setOptions({
        headerRight: () => (
          <RectButton
            style={{
              padding: 9,
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
            onPress={() => {
              storeData();
            }}
          >
            <Feather name={"check"} color={"white"} size={25} />
          </RectButton>
        ),
      }),
    []
  );
  const [date, setDate] = React.useState(new Date());
  const [dateSwitch, setDateSwitch] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const dispatch = useDispatch();
  const storeData = () => {
    if (name.length !== 0) {
      const taskData = {
        name: name,
        description: description,
        date: dateSwitch ? date : null,
        taskListId: 0,
      };
      dispatch(ADD_TASK(taskData));
      navProps.goBack();
    } else {
      alert("Add name");
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: constants.colors.backgroundColor,
      }}
      alwaysBounceHorizontal={true}
    >
      <View style={styles.header}>
        <View style={{ display: "flex" }}>
          <Text style={styles.textLight}>Name</Text>

          <TextForm
            color={"#fff"}
            style={{
              marginBottom: 15,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            value={{ value: name, setValue: setName }}
          />
          <Text style={styles.textLight}>Due date</Text>
          <Switch
            style={{ width: 30, paddingHorizontal: 20, paddingVertical: 10 }}
            value={dateSwitch}
            thumbColor={"white"}
            trackColor={{ false: "white", true: "black" }}
            onActivated={() => {
              setDateSwitch(!dateSwitch);
            }}
          />
          <DateForm
            mode={"date"}
            color={"#fff"}
            enabled={dateSwitch}
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
          enabled={dateSwitch}
          mode={"time"}
          style={{ backgroundColor: "rgba(255,255,255,0.3)", width: 80 }}
        />
        <Text style={[styles.textLight, { color: "white" }]}>Description</Text>
        <TextForm
          color={"#fff"}
          value={{
            value: description,
            setValue: setDescription,
          }}
          multiline={true}
          numberOfLines={3}
          style={{ backgroundColor: "rgba(255,255,255,0.3)", marginBottom: 30 }}
        />
      </View>
    </ScrollView>
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
