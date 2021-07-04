import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { TextForm } from "../../components/Forms";
import { ADD_TASK_LIST, colorThemes } from "../../Redux/TaskReducer";

interface AddTaskListProps {
  navigation: StackNavigationProp<any>;
}
const AddTaskList = ({ navigation: navProps }: AddTaskListProps) => {
  const [name, setName] = React.useState("");
  const [theme, setTheme] = React.useState(colorThemes[0]);
  const dispatch = useDispatch();
  const storeData = () => {
    if (name.length !== 0) {
      const list = {
        name,
        theme,
      };
      dispatch(ADD_TASK_LIST(list));
      navProps.goBack();
    }
  };
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Name</Text>
        <TextForm
          value={{ value: name, setValue: setName }}
          color={"white"}
          style={{ backgroundColor: "rgba(255,255,255,0.4)", marginTop: 15 }}
        />
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={[styles.text, { fontSize: 18, color: "gray" }]}>
          Theme
        </Text>
        <View
          style={{
            // width: 300,
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          {colorThemes.map((theme, index) => (
            <RectButton
              key={index}
              onPress={() => {
                setTheme(theme);
              }}
              style={{ marginRight: 20 }}
            >
              <View
                style={{
                  // width: 20,
                  // height: 20,
                  padding: 14,
                  backgroundColor: theme.mainColor,
                  borderColor: theme.darkText,
                  borderWidth: 2,
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
});
