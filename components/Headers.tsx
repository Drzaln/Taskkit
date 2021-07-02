import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface props {
  color: string;
  children: React.ReactNode;
}

export const FullRound = (props: props) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        minHeight: 260,
        width: "100%",
        paddingTop: 40,
        paddingHorizontal: 20,
        borderBottomEndRadius: 70,
        borderBottomStartRadius: 70,
      }}
    >
      {props.children}
    </View>
  );
};

export const CurvedHeader = () => {
  return <View></View>;
};

export const NoRound = () => {
  return <View></View>;
};
