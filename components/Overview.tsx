import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { ReactElement } from "react";
import { ReactChildren } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
interface OverviewProps {}
const Overview = (props: OverviewProps) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.mainText, { marginBottom: 10, color: "black" }]}>
        Overview
      </Text>
      <Row
        mainText="Tasks"
        extraInfo="13 Tasks"
        icon={
          <MaterialCommunityIcons
            name="clipboard-check-multiple-outline"
            size={18}
            color="white"
          />
        }
        iconColor="#60AEDB"
      />
      <Row
        mainText="Task Lists"
        extraInfo="2 Lists, 13 Tasks"
        icon={<Feather name="list" color="white" size={18} />}
        iconColor="#DB6060"
      />
      <Row
        mainText="In progress"
        extraInfo="3 Tasks"
        iconColor="#DB8C60"
        icon={<Feather name="loader" size={18} color="white" />}
      />
      <Row
        mainText="Finished Tasks"
        extraInfo="3 Tasks"
        icon={<Ionicons name="medal-outline" size={18} color="white" />}
        iconColor="#4FC76A"
      />
    </View>
  );
};

interface RowProps {
  mainText: string;
  extraInfo: string;
  icon: ReactElement;
  iconColor: string;
}

const Row = ({ mainText, extraInfo, icon: Icon, iconColor }: RowProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: iconColor }]}>{Icon}</View>
      <View>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.lightText}>{extraInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  mainText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
  },
  lightText: {
    color: "rgba(0,0,0,0.65)",
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});

export default Overview;
