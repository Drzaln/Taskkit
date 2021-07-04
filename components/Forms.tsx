import { EnumBooleanMember } from "@babel/types";
import * as React from "react";
import { Text } from "react-native";
import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { Platform } from "react-native";
import constants from "../constants/constant";
type textProps = {
  placeholder?: string;
  color: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  value: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const TextForm = ({
  placeholder,

  multiline = false,
  numberOfLines = 1,
  style = {},
  value,
}: textProps) => {
  return (
    <TextInput
      placeholder={placeholder === undefined ? "" : placeholder}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[styles.input, style]}
      textAlign={"left"}
      onChangeText={(e) => {
        value.setValue(e);
      }}
    />
  );
};

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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
  };

  return (
    <RectButton
      style={[styles.dateInput, style]}
      onPress={() => {
        enabled && setShow(true);
      }}
    >
      <Text style={{ color: color, fontSize: 16 }}>
        {mode === "date"
          ? `${date.toUTCString().substring(0, 16)}`
          : `${date.getHours()}:${date.getMinutes()}`}
      </Text>
      {show && (
        <DateTimePicker
          value={date}
          onChange={onChange}
          mode={mode === "date" ? "date" : "time"}
        />
      )}
    </RectButton>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    fontSize: 18,
    fontFamily: constants.fonts.regular,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  dateInput: {
    width: 155,
    fontSize: 14,
    fontFamily: constants.fonts.regular,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
