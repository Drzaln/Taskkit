import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { View } from "react-native";
import { prams } from "../Navigation";
type CustomNavigation = StackNavigationProp<prams, "Custom">;
type CustomRoute = RouteProp<prams, "Custom">;
type CustomProps = {
  navigation: CustomNavigation;
  route: CustomRoute;
};
const Custom = ({ navigation, route }: CustomProps) => {
  return (
    <View>
      <route.params.component navProps={navigation} />
    </View>
  );
};
export default Custom;