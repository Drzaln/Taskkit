import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HoldItem } from "react-native-hold-menu";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import constants from "../constants/constant";
import { COMPLETE_TASK } from "../Redux/TaskReducer";
import { deleteTask, markTaskAsImportant } from "../utils/dispatches";
import CheckBox from "./CheckBox";
interface TaskCardProps {
  taskListName?: string;
  task: {
    name: string;
    description: string;
    taskListId: string;
    completed: boolean;
    taskId: string;
    important?: boolean;
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
    opacity.value = withSpring(task.completed ? 0.6 : 1);
  }, [open, task.completed]);
  const card = useAnimatedStyle(() => {
    return {
      minHeight: minHeight.value,
      opacity: opacity.value,
    };
  }, [open, task.completed]);

  const methodProps = useMemo(() => {
    return {
      "Mark As important": [task.taskId],
      Delete: [task.taskId],
    };
  }, [task]);
  const holdItems = [
    // { text: "Edit Task", icon: "edit", isTitle: true, onPress: () => {} },
    {
      text: "Mark As important",
      icon: "star",
      onPress: (id: any) => {
        markTaskAsImportant(id);
      },
    },
    {
      text: "Edit",
      icon: "edit",
      onPress: (id: any) => {},
    },
    {
      text: "Delete",
      icon: "trash",
      isDestructive: true,
      onPress: (id: any) => {
        deleteTask(id);
      },
    },
  ];

  return (
    <HoldItem items={holdItems} actionParams={methodProps}>
      <Animated.View
        onLayout={() => {}}
        style={[
          styles.container,
          card,
          {
            backgroundColor: theme.mainColor,
            borderWidth: task.important ? 3 : 0,
            borderColor: theme.textColor,
            borderStyle: "solid",
          },
        ]}
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
                    textDecorationLine: task.completed
                      ? "line-through"
                      : "none",
                    textDecorationColor: theme.textColor,
                    textDecorationStyle: "solid",
                    opacity: task.completed ? 0.8 : 1,
                  },
                ]}
              >
                {task.name}
              </Text>
              {date && date.date ? (
                <Text style={[styles.date, { color: theme.textColor }]}>
                  {date.date}
                </Text>
              ) : null}
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
    </HoldItem>
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
    const h = Math.round(event.nativeEvent.layout.height);
    height.value = h;
  }, []);
  return (
    <Animated.View style={child}>
      <View onLayout={onLayout} style={{ minHeight: 3 }}>
        <View>
          {date && date.date ? (
            <Text style={[styles.date, { color: theme.textColor }]}>
              {date.time}
            </Text>
          ) : null}
          {description ? (
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
          ) : null}
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
