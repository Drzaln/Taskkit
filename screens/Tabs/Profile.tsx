import * as React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  return (
    <View>
      <View style={styles.header}>
        <Text>Isamel Karim</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    minHeight: 200,
    color: "#fff",
  },
});
