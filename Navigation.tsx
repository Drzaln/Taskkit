import { AntDesign, Feather } from "@expo/vector-icons";
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import {
  RectButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AddTask from "./screens/stack/AddTask";
import Calendars from "./screens/Tabs/Calendar";
import Home from "./screens/Tabs/Home";
import MyDay from "./screens/Tabs/MyDay";
import Profile from "./screens/Tabs/Profile";
interface NavigationProps {}
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#317579",
          inactiveTintColor: "#8C8C8C",
          style: {
            backgroundColor: "#F1F1F1",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            position: "absolute",
            height: 64,
          },
          showLabel: false,
        }}
        tabBar={(props) => <TabBarNav props={props} />}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => {
              return <AntDesign name="home" size={26} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="My Day"
          component={MyDay}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="check-circle" size={26} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name={"Calendar"}
          component={Calendars}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="calendar" size={26} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen name="Add" component={AddTask} />
        <Tab.Screen
          name={"Profile"}
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

interface TabBarProps {
  props: BottomTabBarProps<BottomTabBarOptions>;
}

const TabBarNav = ({ props: navProps }: TabBarProps) => {
  // console.log(navProps);
  const activeTintColor = navProps.activeTintColor;
  const inactiveTintColor = navProps.inactiveTintColor;
  const activeTab = navProps.state.index;
  // console.log(activeTab);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.add}
        onPress={() => {
          navProps.navigation.navigate("Home");
        }}
      >
        <AntDesign
          name="home"
          size={26}
          color={activeTab === 0 ? activeTintColor : inactiveTintColor}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.add}
        onPress={() => {
          navProps.navigation.navigate("My Day");
        }}
      >
        <Feather
          name="check-circle"
          size={26}
          color={activeTab === 1 ? activeTintColor : inactiveTintColor}
        />
      </TouchableWithoutFeedback>
      <RectButton
        style={styles.button}
        onPress={() => {
          navProps.navigation.navigate("Add");
        }}
      >
        <Feather name="plus" size={26} color="white" />
      </RectButton>
      <TouchableWithoutFeedback
        style={styles.add}
        onPress={() => {
          navProps.navigation.navigate("Calendar");
        }}
      >
        <Feather
          name="calendar"
          size={26}
          color={activeTab === 2 ? activeTintColor : inactiveTintColor}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.add}
        onPress={() => {
          navProps.navigation.navigate("Profile");
        }}
      >
        <Feather
          name="user"
          size={26}
          color={activeTab === 3 ? activeTintColor : inactiveTintColor}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    bottom: 0,
    backgroundColor: "#F1F1F1",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    paddingHorizontal: 10,
    height: 64,
  },
  add: {
    width: 55,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#159DC8",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    top: -15,
  },
});
