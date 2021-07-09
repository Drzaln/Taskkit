import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-svg";
import LogoTextContainer from "./LogoText";
interface TitleBarProps {}
const TitleBar = (props: TitleBarProps) => {
  return (
    <View style={styles.container}>
      <LogoTextContainer fill="#fff" width={120} height={15} />
      <Text>hlkts</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "100%",
    backgroundColor: "#317579",
  },
});
export default TitleBar;
