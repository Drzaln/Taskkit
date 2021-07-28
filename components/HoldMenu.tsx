import { Portal } from "@gorhom/portal";
import MaskedView from "@react-native-community/masked-view";
import * as React from "react";
import {
  LayoutRectangle,
  MaskedViewBase,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
interface HoldMenuProps extends React.FC<{}> {}
// const HoldMenu = ({}:HoldMenuProps) => {
//   return (

//     );
// };
// export default HoldMenu;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
