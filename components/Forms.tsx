import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import constants from "../constants/constant";
import { Pressable } from "react-native";
interface dateProps {
  color: string;
  enabled: boolean;
  date: Date;
  mode: "date" | "time";
  setDate: Dispatch<SetStateAction<Date>>;
  style?: ViewStyle;
}

export const DateForm = ({
  color,
  enabled,
  date,
  setDate,
  mode,
  style,
}: dateProps) => {
  const [show, setShow] = React.useState(false);

  const onChange = (_: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View pointerEvents={enabled ? "box-none" : "none"}>
      <Pressable
        onPress={() => {
          setShow(true);
        }}
        android_ripple={{ color: "rgba(0,0,0,0.2)" }}
        style={
          style?.width !== undefined ? { width: style?.width } : { width: 155 }
        }
      >
        <View
          style={[
            styles.dateInput,
            style,
            {
              opacity: enabled ? 0.7 : 0.3,
              borderBottomColor: color,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              color: color,
            }}
          >
            {mode === "date"
              ? `${date.toUTCString().substring(0, 16)}`
              : `${date.getHours()}:${date.getMinutes()}`}
          </Text>
          <Feather name={"chevron-down"} size={18} color={color} />
          {show && (
            <DateTimePicker
              value={date}
              // @ts-ignore
              onChange={onChange}
              mode={mode}
              onTouchCancel={() => {
                //
              }}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    width: 155,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
    fontSize: 14,
    fontFamily: constants.fonts.regular,
    borderStyle: "solid",
    paddingVertical: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
});
