import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import MainActionButton from "../../components/ActionButton";
import Overview from "../../components/Overview";
import TaskList from "../../components/TaskLists";
import constants from "../../constants/constant";
import { RootState } from "../../Redux/store";
import { prams } from "../../StackNav";
import { formatDate } from "../../utils/FindById";

interface HomeProps {
  navigation: StackNavigationProp<prams>;
}

export default function Home({ navigation: navProps }: HomeProps) {
  return (
    <>
      <MainActionButton
        firstAction={() => {
          navProps.navigate("Add Task");
        }}
        secondAction={() => {
          navProps.navigate("Add Task List");
        }}
      />
      <ScrollView
        bounces={false}
        indicatorStyle={"white"}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <Header />
        <Overview navProps={navProps} />
        <TaskList navigation={navProps} />
        <StatusBar
          backgroundColor={constants.colors.accentColor}
          translucent={true}
        />
      </ScrollView>
    </>
  );
}

const Header = () => {
  const { username, tasks } = useSelector((state: RootState) => state);
  const [tasksForDay, setTaskForDay] = React.useState<number>(0);
  const [tasksString, setTaskString] = React.useState(
    "No tasks left for the day"
  );

  React.useEffect(() => {
    let s = 0;
    Object.keys(tasks).map((i) => {
      const task = { ...tasks[i], taskId: i };
      const date = formatDate(task.date);
      if (formatDate(Date.now()).date === date.date) {
        s++;
      }
    });
    setTaskForDay(s);
    switch (tasksForDay) {
      case 0:
        setTaskString("No tasks left for the day");
        break;
      case 1:
        setTaskString(`${tasksForDay} Task left for the day`);
        break;

      case 2:
      case 3:
      case 4:
        setTaskString(`${tasksForDay} Tasks left for the day`);
        break;

      default:
        setTaskString(`${tasksForDay} Tasks for the day`);
        break;
    }
  }, [tasks]);
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.container}>
        <View style={{ display: "flex" }}>
          <Text style={headerStyles.textNormal}>Hello there</Text>
          <Text style={headerStyles.title}>{username}</Text>
          <Text style={headerStyles.textLight}>{tasksString}</Text>
        </View>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: constants.colors.accentColor,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  title: {
    fontSize: 36,
    fontFamily: constants.fonts.bold,
    color: "white",
  },
  textNormal: {
    fontFamily: constants.fonts.bold,
    fontSize: 26,
    color: "#fff",
  },
  textLight: {
    marginTop: 10,
    fontFamily: constants.fonts.regular,
    fontSize: 18,
    color: "#fff",
    fontWeight: "400",
  },
});
