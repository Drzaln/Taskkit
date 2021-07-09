import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { ADD_TASK_LIST, colorThemes } from "../../Redux/TaskReducer";

interface AddTaskListProps {
  navigation: StackNavigationProp<any>;
}
const AddTaskList = ({ navigation: navProps }: AddTaskListProps) => {
  React.useLayoutEffect(
    () =>
      navProps.setOptions({
        headerRight: () => (
          <View>
            <RectButton
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
            </RectButton>
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
        <Text style={styles.text}>Name</Text>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="rgba(255,255,255,0.8)"
        />
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={[styles.text, { fontSize: 18, color: "gray" }]}>
          Theme
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          {colorThemes.map((theme1, index) => (
            <RectButton
              key={index}
              onPress={() => {
                setTheme(theme1);
              }}
              style={{
                marginRight: 20,
              }}
            >
              <View
                style={{
                  // width: 20,
                  // height: 20,
                  padding: 14,
                  backgroundColor: theme1.mainColor,
                  borderColor:
                    theme1 === theme ? theme.textColor : "transparent",
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderRadius: 5,
                }}
              />
            </RectButton>
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
    backgroundColor: "#317579",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    color: "white",
    fontFamily: "Gilroy-Regular",
  },
  input: {
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: "rgb(200,200,200)",
    borderStyle: "solid",
    color: "white",
    width: 300,
    paddingHorizontal: 5,
    fontSize: 17,
    fontFamily: "Gilroy-Medium",
  },
});
