import * as React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top }}>
      <View style={styles.header}>
        <Text>Isamel Karim</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",

    color: "#fff",
  },
});
