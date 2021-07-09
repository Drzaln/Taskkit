import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import {
  BorderlessButton,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { DateForm } from "../../components/Forms";
import constants from "../../constants/constant";
import { prams } from "../../Navigation";
import { RootState } from "../../Redux/store";
import { ADD_TASK } from "../../Redux/TaskReducer";
interface AddTaskProps {
  navigation: StackNavigationProp<prams>;
}

export default function AddTask({ navigation: navProps }: AddTaskProps) {
  const [date, setDate] = React.useState(new Date());
  const [dateSwitch, setDateSwitch] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.TaskReducer.taskList);
  const [taskListId, setTaskListId] = React.useState(Object.keys(lists)[0]);
  const [push, setPush] = React.useState(false);
  React.useEffect(() => {
    if (push) {
      if (name.length > 0) {
        const taskData = {
          name,
          description,
          taskListId,
          date: dateSwitch ? date.getTime() : null,
        };
        dispatch(ADD_TASK(taskData));
        navProps.goBack();
      } else {
        setPush(false);
        Alert.alert("Missing", "The name filed is empty");
      }
    }
  }, [push]);
  React.useLayoutEffect(
    () =>
      navProps.setOptions({
        headerRight: () => (
          <View>
            <BorderlessButton
              style={{
                padding: 9,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
              onPress={() => {
                setPush(true);
              }}
            >
              <Feather name={"check"} color={"white"} size={25} />
            </BorderlessButton>
          </View>
        ),
      }),
    [navProps]
  );
  return (
    <ScrollView
      style={{
        backgroundColor: constants.colors.backgroundColor,
      }}
    >
      <View style={styles.header}>
        <View style={{ display: "flex" }}>
          <Text style={styles.textLight}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
            style={styles.input}
            placeholder={"Name"}
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text style={[styles.textLight, { opacity: dateSwitch ? 1 : 0.6 }]}>
              Due date
            </Text>

            <Switch
              style={{ width: 30, paddingHorizontal: 20 }}
              value={dateSwitch}
              thumbColor={"white"}
              trackColor={{ false: "white", true: "black" }}
              onValueChange={(v) => {
                setDateSwitch(v);
              }}
            />
          </View>
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
          paddingTop: 10,
        }}
      >
        <Text style={[styles.textLight, { opacity: dateSwitch ? 1 : 0.6 }]}>
          Time
        </Text>
        <DateForm
          date={date}
          setDate={setDate}
          color={"white"}
          enabled={dateSwitch}
          mode={"time"}
          style={{ width: 80 }}
        />
        <Text style={[styles.textLight, { color: "white" }]}>Description</Text>
        <TextInput
          style={[styles.input, { flexWrap: "wrap", marginBottom: 10 }]}
          multiline={true}
          value={description}
          onChangeText={(e) => setDescription(e)}
          placeholder="Description"
          placeholderTextColor="rgba(255,255,255,0.7)"
        />
        <Text style={styles.textLight}>Task List</Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", paddingTop: 10 }}
        >
          {Object.keys(lists).map((list, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setTaskListId(list);
              }}
            >
              <View
                style={[
                  styles.listContainer,
                  {
                    backgroundColor: lists[list].theme.mainColor,
                    borderColor:
                      list === taskListId
                        ? lists[list].theme.textColor
                        : "transparent",
                    borderWidth: 3,
                    borderStyle: "solid",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 14,
                    color: lists[list].theme.textColor,
                  }}
                >
                  {lists[list].name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
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
  textLight: {
    fontFamily: constants.fonts.bold,
    marginTop: 20,
    fontSize: 16,
    marginBottom: 5,
    color: "white",
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
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.7)",
    borderStyle: "solid",
    color: "white",
    width: 300,
    paddingHorizontal: 5,
    fontSize: 17,
    fontFamily: "Gilroy-Medium",
  },
  listContainer: {
    padding: 6,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
