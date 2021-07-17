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
import LogoTextContainer from "./components/LogoText";
import TaskListInfo from "./components/TaskListInfo";
import constants from "./constants/constant";
import { RootState } from "./Redux/store";
import Custom from "./screens/Custom";
import AddTask from "./screens/stack/AddTask";
import AddTaskList from "./screens/stack/AddTaskList";
import Calendars from "./screens/Tabs/Calendar";
import Home from "./screens/Tabs/Home";
import MyDay from "./screens/Tabs/MyDay";
import Profile from "./screens/Tabs/Profile";
export type prams = {
  Main: undefined;
  "Add Task":
    | {
        backgroundColor: string;
        taskListId: string;
        textColor: string;
      }
    | undefined;
  "Add Task List": undefined;
  "Task List info": {
    name: string;
    theme: { mainColor: string; textColor: string };
    taskListId: string;
  };
  Custom: {
    component: React.FC<{ navProps: StackNavigationProp<prams, "Custom"> }>;
  };
};
const Stack = createStackNavigator<prams>();
const Tab = createBottomTabNavigator();

interface HomePageProps {
  screen: any;
}
const StackPage = ({ screen }: HomePageProps) => {
  const taskLists = useSelector(
    (state: RootState) => state.TaskReducer.taskList
  );
  const taskList = taskLists["0"];
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: constants.colors.accentColor,
          borderWidth: 0,
          shadowOpacity: 0,
          height: 80,
        },
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Gilroy-Bold",
        },
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="Main"
        component={screen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: constants.colors.accentColor,
            borderWidth: 0,
            // shadowOpacity: 0,
            // elevation: 0,
          },
          headerTitleAlign: "left",
          headerTitle: () => {
            return <LogoTextContainer width={120} height={20} fill={"#fff"} />;
          },
        }}
      />
      <Stack.Screen
        name="Add Task"
        component={AddTask}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: constants.colors.accentColor,
            borderWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />

      <Stack.Screen
        name="Add Task List"
        component={AddTaskList}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: constants.colors.accentColor,
            borderWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="Custom"
        component={Custom}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Task List info"
        component={TaskListInfo}
        initialParams={taskList}
        options={{
          headerStyle: {
            height: 80,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          cardShadowEnabled: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: constants.fonts.bold,
            paddingLeft: 2,
          },
        }}
      />
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
          // component={AddTask}
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
