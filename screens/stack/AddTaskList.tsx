import { Feather } from "@expo/vector-icons";
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
import { useDispatch, useSelector } from "react-redux";
import constants from "../../constants/constant";
import { RootState } from "../../Redux/store";
import { ADD_TASK_LIST } from "../../Redux/TaskReducer";
import { colorThemes } from "../../Redux/themes";

interface AddTaskListProps {
  navigation: StackNavigationProp<any>;
}
const AddTaskList = ({ navigation: navProps }: AddTaskListProps) => {
  React.useLayoutEffect(
    () =>
      navProps.setOptions({
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
              <Feather name={"check"} color="white" size={25} />
            </Pressable>
          </View>
        ),
      }),
    [navProps]
  );
  const [name, setName] = React.useState<string>("");
  const [theme, setTheme] = React.useState(colorThemes[0]);
  const dispatch = useDispatch();
  const taskList = useSelector(
    (state: RootState) => state.TaskReducer.taskList
  );
  const [push, setPush] = React.useState(false);
  const duplicateCheck = () => {
    const a = Object.keys(taskList).map((i) => {
      return taskList[i].name === name;
    });
    if (a.includes(true)) {
      return true;
    }
    return false;
  };
  React.useEffect(() => {
    if (push) {
      if (name.length > 0) {
        if (duplicateCheck()) {
          Alert.alert("Duplicate", "You can't have 2 lists with the same name");
          setPush(false);
        } else {
          const data = {
            name,
            theme,
          };
          dispatch(ADD_TASK_LIST(data));
          navProps.goBack();
        }
      } else {
        Alert.alert("Missing", "The name filed is empty");
        setPush(false);
      }
    }
  }, [push]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontFamily: constants.fonts.bold,
            color: "white",
            fontSize: 28,
            marginBottom: 10,
          }}
        >
          Add Task list
        </Text>
        <Text style={styles.text}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.input}
          placeholder="Your Title here"
          placeholderTextColor="rgba(255,255,255,0.8)"
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={[styles.text, { fontSize: 18, color: "gray" }]}>
          Theme
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {colorThemes.map((theme1, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setTheme(theme1);
              }}
              style={{
                marginRight: 15,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  width: 45,
                  height: 45,
                  marginTop: 10,
                  padding: 6,
                  backgroundColor:
                    theme1 === theme ? "rgba(0,0,0,0.2)" : "transparent",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: theme1.mainColor,
                    flex: 1,
                    transform: [{ rotate: "-45deg" }],
                    borderColor:
                      theme1 === theme ? theme.textColor : "transparent",
                    borderWidth: 3,
                    borderStyle: "solid",
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: theme1.textColor,
                    borderRadius: 0,
                    transform: [{ rotate: "-45deg" }],
                    borderColor:
                      theme1 === theme ? theme.mainColor : "transparent",
                    borderWidth: 3,
                    borderStyle: "solid",
                  }}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};
export default AddTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: constants.colors.accentColor,
    paddingHorizontal: 20,
    // paddingTop: 00,
    paddingBottom: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    fontFamily: constants.fonts.bold,

    marginTop: 20,
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderStyle: "solid",
    color: "#fff",
    width: 300,
    paddingHorizontal: 2,
    fontSize: 17,
    fontFamily: "Gilroy-Medium",
  },
});
