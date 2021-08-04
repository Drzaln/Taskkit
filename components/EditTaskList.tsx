import { Feather } from "@expo/vector-icons";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import constants, { globalStyles } from "../constants/constant";
import { EDIT_TASK_LIST } from "../Redux/TaskReducer";
import { ColorThemesMap } from "../screens/stack/AddTaskList";
interface HoldMenuProp {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  taskListTheme: {
    mainColor: string;
    textColor: string;
  };
  taskListName: string;
  taskListId: string;
}
const EditTaskList = ({
  visible,
  taskListTheme,
  setVisible,
  taskListName,
  taskListId,
}: HoldMenuProp) => {
  const [theme, setTheme] = React.useState(taskListTheme);
  const [name, setName] = React.useState(taskListName);
  const scale = useSharedValue(0.4);
  React.useEffect(() => {
    if (visible) {
      scale.value = withDelay(20, withTiming(1, { duration: 140 }));
    }
  });
  const enteringAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: interpolate(scale.value, [0.4, 1], [0, 1]),
  }));
  const getBack = () => {
    scale.value = withTiming(0.4, { duration: 140 });
    setTimeout(() => {
      setVisible(false);
    }, 150);
  };
  const submitChanges = () => {
    useDispatch()(
      EDIT_TASK_LIST({
        taskListId,
        theme,
        name,
      })
    );
  };
  return (
    <KeyboardAvoidingView>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={getBack}
      >
        <View style={styles.container}>
          <Animated.View style={enteringAnimation}>
            <View style={styles.card}>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.button}
                  onPress={getBack}
                  android_ripple={{ color: "black", borderless: true }}
                >
                  <Feather name="chevron-left" size={25} />
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={submitChanges}
                  android_ripple={{ color: "black", borderless: true }}
                >
                  <Feather name="check" size={25} />
                </Pressable>
              </View>
              <View>
                <Text
                  style={[
                    globalStyles.textBold,
                    { color: "gray", fontSize: 18 },
                  ]}
                >
                  Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={(val) => setName(val)}
                  style={styles.input}
                  placeholder="Your Title here"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                />
              </View>
              <ColorThemesMap theme={theme} setTheme={setTheme} />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
export default EditTaskList;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginHorizontal: 20,
    maxHeight: 350,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  button: {
    padding: 5,
  },
  outside: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -99,
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderStyle: "solid",
    color: "gray",
    width: 200,
    paddingHorizontal: 2,
    fontSize: 17,
    fontFamily: constants.fonts.medium,
  },
});
