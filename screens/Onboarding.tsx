import { Feather } from "@expo/vector-icons";
import PaperOnboarding, {
  PaperOnboardingItemType,
} from "@gorhom/paper-onboarding";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import constants from "../constants/constant";
import { CHANGE_USERNAME } from "../Redux/TaskReducer";
import OnboardingImage1 from "./svgs/first";
import OnboardingImage2 from "./svgs/second";
import OnboardingImage3 from "./svgs/third";
interface CustomProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  image?: React.ReactNode;
  titleColor?: string;
  textColor?: string;
}
const Custom = ({
  children,
  image,
  title,
  description,
  titleColor = "white",
  textColor = "white",
}: CustomProps) => {
  return (
    <View style={styles.container}>
      {image}
      <Text style={[styles.header, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.description, { color: textColor }]}>
        {description}
      </Text>
      {children}
    </View>
  );
};
const FirstPage = () => {
  return (
    <Custom
      title="Manage Your Time"
      description="Prioritize your important tasks and set up your schedule"
      titleColor="#6C57A6"
      textColor="#757575"
      image={<OnboardingImage1 width={"300"} height="300" />}
    />
  );
};
const SecondPage = () => {
  return (
    <Custom
      title="Customize your experience"
      description="Pick your favorites colors and
        separate your lists 
        with colorful themes"
      image={<OnboardingImage2 width={"300"} height="300" />}
    />
  );
};
const LastPage = () => {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const AddUserName = () => {
    if (name === "") {
      Alert.alert("Missing", "The name filed is empty");
      return;
    }
    dispatch(CHANGE_USERNAME({ name }));
  };
  return (
    <KeyboardAvoidingView>
      <Custom
        title="Final Steps"
        description="add your username to start using the app"
        image={<OnboardingImage3 width={"300"} height="300" />}
      >
        <View style={styles.inputBox}>
          <TextInput
            value={name}
            placeholder="Username"
            style={styles.input}
            onChangeText={v => {
              setName(v);
            }}
          />
          <Pressable
            hitSlop={{ right: 10, left: 10, top: 10, bottom: 10 }}
            onPress={AddUserName}
            style={styles.button}
          >
            <Feather name="check" size={25} />
          </Pressable>
        </View>
      </Custom>
    </KeyboardAvoidingView>
  );
};
const data: PaperOnboardingItemType[] = [
  {
    backgroundColor: "white",
    content: FirstPage,
    icon: () => {
      return <Feather name="home" size={20} />;
    },
  },
  {
    backgroundColor: "#6CB2B8",
    content: SecondPage,
    icon: () => {
      return <Feather name="watch" size={20} />;
    },
  },
  {
    backgroundColor: "#9D8FBF",
    content: LastPage,
    icon: () => {
      return <Feather name="edit" size={20} />;
    },
    showCloseButton: false,
  },
];
export default function Onboarding() {
  const handleOnClosePress = () => console.log("navigate to other screen");
  return (
    <PaperOnboarding
      data={data}
      safeInsets={{ left: 0, right: 0 }}
      onCloseButtonPress={handleOnClosePress}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "white",
    marginVertical: 20,
    width: "100%",
    fontSize: 30,
    fontFamily: constants.fonts.bold,
    textAlign: "center",
  },
  description: {
    fontSize: 19,
    color: "white",
    fontFamily: constants.fonts.regular,
    textAlign: "center",
  },
  inputBox: {
    flexDirection: "row",
    marginVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "white",
    fontSize: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    width: 200,
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 6,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
