import { AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import { taskType } from "./Redux/TaskReducer";
import Onboarding from "./screens/Onboarding";
import Calendars from "./screens/Tabs/Calendar";
import Home from "./screens/Tabs/Home";
import MyDay from "./screens/Tabs/MyDay";
import { StackPage } from "./StackNav";
// import Profile from "./screens/Tabs/Profile";
const Tab = createBottomTabNavigator();

export interface HomePageProps {
  screen: any;
}
const Navigation = () => {
  const isFirstTime = useSelector((state: RootState) => state.username);
  if (isFirstTime) {
    return <Onboarding />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#9c28a8",
          inactiveTintColor: "gray",
          style: {
            backgroundColor: "#F1F1F1",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            position: "absolute",
            height: 64,
          },
          keyboardHidesTabBar: true,
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => {
              return <AntDesign name="home" size={26} color={color} />;
            },
          }}
          children={() => <StackPage screen={Home} />}
        />
        <Tab.Screen
          name="My Day"
          children={() => <StackPage screen={MyDay} />}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="check-circle" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={"Calendar"}
          // component={AddTask}
          component={Calendars}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="calendar" size={26} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name={"Profile"}
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={26} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
