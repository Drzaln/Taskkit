import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "./constants/constant";
import AddTask from "./screens/stack/AddTask";
import AddTaskList from "./screens/stack/AddTaskList";
import Calendars from "./screens/Tabs/Calendar";
import Home from "./screens/Tabs/Home";
import MyDay from "./screens/Tabs/MyDay";
import Profile from "./screens/Tabs/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface HomePageProps {
  screen: any;
}
const StackPage = ({ screen }: HomePageProps) => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#317579",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Gilroy-Bold",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{
          headerStyle: {
            backgroundColor: constants.colors.accentColor,
          },
          headerTitle: "Create New Task",
        }}
      />

      <Stack.Screen name="Add Task List" component={AddTaskList} />
    </Stack.Navigator>
  );
};
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
          component={Calendars}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="calendar" size={26} color={color} />
            ),
          }}
        />
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
