import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { DateForm } from "../../components/Forms";
import constants from "../../constants/constant";
import { RootState } from "../../Redux/store";
import { ADD_TASK } from "../../Redux/TaskReducer";
import { prams } from "../../StackNav";

type AddTaskProps = {
  route: RouteProp<prams, "Add Task">;
  navigation: StackNavigationProp<prams, "Add Task">;
};
export default function AddTask({
  navigation: navProps,
  route: { params },
}: AddTaskProps) {
  const listId = params?.taskListId;
  const taskInfo = params?.taskInfo;
  const textColor = params?.textColor ? params.textColor : "white";
  const backgroundColor = params?.backgroundColor
    ? params.backgroundColor
    : constants.colors.accentColor;
  const [date, setDate] = React.useState(
    taskInfo?.date ? new Date(taskInfo.date) : new Date()
  );
  const [dateSwitch, setDateSwitch] = React.useState<boolean>(
    taskInfo ? typeof taskInfo.date === "number" : false
  );
  const [name, setName] = React.useState<string>(taskInfo ? taskInfo.name : "");
  const [description, setDescription] = React.useState<string>(
    taskInfo?.description ? taskInfo.description : ""
  );
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.TaskReducer.taskList);
  const [taskListId, setTaskListId] = React.useState(Object.keys(lists)[0]);
  const [push, setPush] = React.useState(false);
  React.useEffect(() => {
    if (listId) {
      setTaskListId(listId);
    }

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
        headerStyle: {
          backgroundColor: backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
        },
        headerTintColor: textColor,
        headerRight: () => (
          <View
            style={{
              marginRight: 6,
              borderRadius: 30,
              padding: 10,
              overflow: "hidden",
            }}
          >
            <Pressable
              android_ripple={{
                color: "rgba(0,0,0,0.2)",
                borderless: true,
              }}
              style={{
                padding: 4,
              }}
              onPress={() => {
                setPush(true);
              }}
            >
              <Feather name={"check"} color={textColor} size={25} />
            </Pressable>
          </View>
        ),
      }),
    [navProps]
  );
  return (
    <ScrollView>
      <View style={[styles.header, { backgroundColor: backgroundColor }]}>
        <View style={{ display: "flex" }}>
          <Text
            style={{
              fontFamily: constants.fonts.bold,
              color: textColor,
              fontSize: 28,
            }}
          >
            {params?.taskInfo ? "Edit Task" : "Create New Task"}
          </Text>
          <Text style={[styles.textLight, { color: textColor }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
            style={[
              styles.input,
              {
                borderBottomColor: textColor,
                color: textColor,
              },
            ]}
            placeholder={"Name"}
            placeholderTextColor={textColor}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.textLight,
                { opacity: dateSwitch ? 1 : 0.6, color: textColor },
              ]}
            >
              Due date
            </Text>

            <Switch
              style={{ width: 30, paddingHorizontal: 20 }}
              value={dateSwitch}
              thumbColor={textColor}
              trackColor={{ false: "white", true: "black" }}
              onValueChange={(v) => {
                setDateSwitch(v);
              }}
            />
          </View>
          <DateForm
            mode={"date"}
            color={textColor}
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
        <Text
          style={[
            styles.textLight,
            { opacity: dateSwitch ? 1 : 0.6, color: "#808080" },
          ]}
        >
          Time
        </Text>
        <DateForm
          date={date}
          setDate={setDate}
          color={"#808080"}
          enabled={dateSwitch}
          mode={"time"}
          style={{ width: 80 }}
        />
        <Text style={[styles.textLight, { color: "#757575" }]}>
          Description
        </Text>
        <TextInput
          style={[
            styles.input,
            { flexWrap: "wrap", marginBottom: 10, color: "#808080" },
          ]}
          multiline={true}
          value={description}
          onChangeText={(e) => setDescription(e)}
          placeholder="Description"
          placeholderTextColor="rgba(128,128,128,0.8)"
        />
        {typeof listId === "undefined" && (
          <View>
            <Text style={[styles.textLight, { color: "#757575" }]}>
              Task List
            </Text>
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
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: "Gilroy-Medium",
                        fontSize: 16,
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
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    // paddingTop: 10,
    paddingBottom: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
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

    position: "absolute",
    bottom: 84,
    right: 20,
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128,128,128,1)",
    borderStyle: "solid",
    color: "#fff",
    width: 300,
    paddingHorizontal: 2,
    fontSize: 17,
    fontFamily: "Gilroy-Medium",
  },
  listContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid",
  },
});
