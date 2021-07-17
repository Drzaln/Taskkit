import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface ActionButtonProps {
  firstAction: () => void;
  secondAction: () => void;
}

const ActionButton = ({ firstAction, secondAction }: ActionButtonProps) => {
  //
  const [open, setOpen] = React.useState(false);
  //
  //
  // //
  // //
  const rotate = useSharedValue(0);
  // //

  // //
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, [open]);
  // //

  // //
  const translateY1Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(open ? 0 : 70, {
            mass: open ? 0.7 : 0.5,
            damping: open ? 10 : 13,
          }),
        },
      ],
    };
  });
  const translateY2Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(open ? 0 : 140, {
            mass: open ? 0.7 : 0.5,
            damping: open ? 10 : 13,
          }),
        },
      ],
    };
  });
  //
  React.useEffect(() => {
    if (open) {
      rotate.value = withSpring(135);
    } else {
      rotate.value = withSpring(0);
    }
  }, [open]);

  return (
    <View style={[styles.container]}>
      <View style={styles.button}>
        <Pressable
          hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
          android_ripple={{
            color: "rgba(255,255,255,0.2)",
            borderless: true,
            radius: 30,
          }}
          onPress={() => {
            setOpen((e) => !e);
          }}
        >
          <Animated.View style={[rotateStyle, {}]}>
            <Feather name={"plus"} color={"white"} size={26} />
          </Animated.View>
        </Pressable>
      </View>
      {/*  */}

      {/*  */}
      <Animated.View
        style={[translateY1Style, styles.extra]}
        pointerEvents={open ? "box-none" : "none"}
      >
        <View style={[styles.button, { backgroundColor: "#9B9FB5" }]}>
          <Pressable
            hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
            onPress={firstAction}
            android_ripple={{
              color: "rgba(0,0,0,0.2)",
              borderless: true,
              radius: 30,
            }}
          >
            <MaterialIcons name="add-task" size={24} color="white" />
          </Pressable>
        </View>
      </Animated.View>

      {/*  */}

      {/*  */}
      <Animated.View
        style={[translateY2Style, styles.extra]}
        pointerEvents={open ? "box-none" : "none"}
      >
        <View style={[styles.button, { backgroundColor: "#B1B7D1" }]}>
          <Pressable
            hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
            onPress={secondAction}
            android_ripple={{
              borderless: true,
              color: "rgba(0,0,0,0.2)",
              radius: 30,
            }}
          >
            <Entypo name="add-to-list" size={24} color="white" />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default ActionButton;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99,
    bottom: 84,
    right: 20,
    alignItems: "center",
    flexDirection: "column-reverse",
  },

  button: {
    backgroundColor: "#7A6174",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  extra: {
    zIndex: -1,
    marginBottom: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    position: "absolute",
    left: -80,
  },
});
