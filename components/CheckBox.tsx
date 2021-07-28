import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface CheckBoxProps extends ViewStyle {
  value: boolean;
  onPress: () => void;
  mainColor: string;
  textColor: string;
}
const CheckBox = ({
  value,
  onPress,
  mainColor,
  textColor,
  ...props
}: CheckBoxProps) => {
  const scale = useSharedValue(value ? 1 : 0);
  React.useEffect(() => {
    if (value) {
      scale.value = withSpring(1, { damping: 10, mass: 0.3 });
    } else {
      scale.value = withSpring(0, { damping: 10, mass: 0.7 });
    }
  });
  const animate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      hitSlop={{ bottom: 10, left: 10, top: 10, right: 10 }}
      onPress={onPress}
    >
      <View style={[styles.check, { ...props, borderColor: textColor }]}>
        <Animated.View
          style={[styles.active, animate, { backgroundColor: textColor }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
  },
  check: {
    opacity: 0.8,
    borderRadius: 50,
    width: "100%",
    height: "100%",
    borderWidth: 3,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    width: "80%",

    height: "80%",
    borderRadius: 50,
  },
});
