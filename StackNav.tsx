import * as React from "react";
import { useSelector } from "react-redux";
import LogoTextContainer from "./components/LogoText";
import TaskListInfo from "./components/TaskListInfo";
import constants, { noShadowHeader } from "./constants/constant";
import { RootState } from "./Redux/store";
import Custom from "./screens/Custom";
import AddTask from "./screens/stack/AddTask";
import AddTaskList from "./screens/stack/AddTaskList";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { taskType } from "./Redux/TaskReducer";

export interface HomePageProps {
  screen: any;
}
export type prams = {
  Main: undefined;
  "Add Task":
    | {
        backgroundColor: string;
        taskListId: string;
        textColor: string;
        taskInfo?: taskType;
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
export const Stack = createStackNavigator<prams>();
export const StackPage = ({ screen }: HomePageProps) => {
  const taskLists = useSelector((state: RootState) => state.taskList);
  const taskList = taskLists["0"];
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: constants.colors.accentColor,
          // remove header drop shadow
          ...noShadowHeader,
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
            ...noShadowHeader,
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
            ...noShadowHeader,
          },
        }}
      />
      <Stack.Screen name="Custom" component={Custom} options={{}} />
      <Stack.Screen
        name="Task List info"
        component={TaskListInfo}
        initialParams={taskList}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};
