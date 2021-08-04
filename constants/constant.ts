import { StyleSheet } from "react-native";
import { colorThemes } from "./themes";

const constants = {
  colors: {
    backgroundColor: "#C4C4C4",
    accentColor: "#9D98AB",
  },
  padding: {
    horizontal: 20,
    vertical: 30,
  },
  fonts: {
    regular: "Gilroy-Regular",
    medium: "Gilroy-Medium",
    bold: "Gilroy-Bold",
    heavy: "Gilroy-Heavy",
  },
};
export const noShadowHeader = {
  borderWidth: 0,
  shadowOpacity: 0,
  elevation: 0,
};
export const globalStyles = StyleSheet.create({
  background: {
    backgroundColor: "#C4C4C4",
  },
  textMediumLight: {
    fontFamily: constants.fonts.medium,
    fontSize: 14,
    color: "white",
  },
  textBold: {
    fontFamily: constants.fonts.medium,
    fontSize: 14,
    color: "white",
  },
});
export const defaultTaskLists = [
  {
    name: "Personal",
    theme: colorThemes[Math.floor(Math.random() * colorThemes.length)],
  },
  {
    name: "School",
    theme: colorThemes[Math.floor(Math.random() * colorThemes.length)],
  },
  {
    name: "Shopping list",
    theme: colorThemes[Math.floor(Math.random() * colorThemes.length)],
  },
  {
    name: "Work",
    theme: colorThemes[Math.floor(Math.random() * colorThemes.length)],
  },
];

export default constants;
