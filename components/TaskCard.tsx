import { Feather, Fontisto } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import {
  RectButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import constants from "../constants/constant";
import { useDispatch } from "react-redux";
import { COMPLETE_TASK } from "../Redux/TaskReducer";
interface TaskCardProps {
  taskListName?: string;
  task: {
    name: string;
    description: string;
    taskListId: string;
    dateId: number | null;
    completed: boolean;
    taskId: string;
  };
  date?: {
    time: string | null;
    date: string | null;
  };
  theme: {
    mainColor: string;
    textColor: string;
  };
}

const TaskCard = ({ task, date, theme, taskListName }: TaskCardProps) => {
  const [open, setOpen] = useState(false);
  const [checkBox, setCheckBox] = useState(task.completed);
  const minHeight = useSharedValue(70);
  const opacity = useSharedValue(task.completed ? 0.7 : 1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(COMPLETE_TASK({ taskId: task.taskId, value: checkBox }));
  }, [checkBox]);
  React.useEffect(() => {
    if (open) {
      minHeight.value = withSpring(100, { damping: 14, mass: 0.3 });
    } else {
      minHeight.value = withSpring(70, { damping: 14, mass: 0.3 });
    }
    opacity.value = withSpring(task.completed ? 0.7 : 1);
  }, [open, task.completed]);
  const card = useAnimatedStyle(() => {
    return {
      minHeight: minHeight.value,
      opacity: opacity.value,
    };
  }, [open, task.completed]);

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: theme.mainColor }, card]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen((show) => !show);
          }}
          hitSlop={{ top: 10, left: 10, right: 30, bottom: 10 }}
        >
          <View>
            <Text
              style={[
                styles.name,
                {
                  color: theme.textColor,
                  textDecorationLine: task.completed ? "line-through" : "none",
                  textDecorationColor: theme.textColor,
                  textDecorationStyle: "solid",
                  opacity: task.completed ? 0.8 : 1,
                },
              ]}
            >
              {task.name}
            </Text>
            {date && (
              <Text style={[styles.date, { color: theme.textColor }]}>
                {date.date}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
        <CheckBox
          value={checkBox}
          onPress={() => {
            setCheckBox((i) => !i);
          }}
          mainColor={theme.mainColor}
          textColor={theme.textColor}
        />
      </View>
      <AnimatedPart
        task={task}
        open={open}
        theme={theme}
        minHeight={minHeight}
        taskListName={taskListName}
        date={date}
      />
    </Animated.View>
  );
};
export default TaskCard;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    minHeight: 70,
    paddingVertical: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: "Gilroy-Medium",
    // paddingVertical: 5,
  },
  date: {
    fontSize: 13,
    fontFamily: "Gilroy-Regular",
    opacity: 0.8,
  },
  description: {
    fontSize: 16,
    fontFamily: constants.fonts.medium,
    opacity: 0.8,
    marginTop: 3,
  },
  taskListName: {
    fontFamily: constants.fonts.medium,
    fontSize: 15,
  },
  separator: {
    width: "40%",
    opacity: 0.8,
    height: 1,
    marginVertical: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  lightText: {
    fontFamily: constants.fonts.regular,
  },
});
const AnimatedPart = ({
  minHeight,
  open,
  task,
  theme,
  taskListName,
  date,
}: TaskCardProps & {
  minHeight: Animated.SharedValue<number>;
  open: boolean;
}) => {
  const description = task.description;
  const height = useSharedValue(30);
  const child = useAnimatedStyle(() => {
    return {
      opacity: interpolate(minHeight.value, [70, 100], [0, 1]),
      top: interpolate(minHeight.value, [70, 100], [20, 0]),
      height: interpolate(minHeight.value, [70, 100], [0, height.value]),
    };
  }, [open]);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const h = event.nativeEvent.layout.height;
    height.value = h;
    // console.log(event.nativeEvent.layout);
  }, []);
  return (
    <Animated.View style={child}>
      <View onLayout={onLayout} style={{ minHeight: 3 }}>
        <View>
          {date && (
            <Text style={[styles.date, { color: theme.textColor }]}>
              {date.time}
            </Text>
          )}
          {description.length > 0 && (
            <>
              <View style={styles.separator} />
              <Text
                style={[
                  styles.lightText,
                  { color: theme.textColor, fontSize: 14 },
                ]}
              >
                Description :
              </Text>
              <Text style={[styles.description, { color: theme.textColor }]}>
                {task.description}
              </Text>
            </>
          )}
          {taskListName && (
            <>
              <View style={styles.separator} />
              <Text
                style={[
                  styles.lightText,
                  { fontSize: 14, color: theme.textColor },
                ]}
              >
                Task List :
              </Text>
              <Text style={[styles.taskListName, { color: theme.textColor }]}>
                {taskListName}
              </Text>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};
