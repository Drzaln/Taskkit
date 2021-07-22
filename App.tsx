import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./Navigation";
import store from "./Redux/store";
import { HoldMenuProvider } from "react-native-hold-menu";
import { Feather } from "@expo/vector-icons";
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <HoldMenuProvider iconComponent={Feather} theme={"light"}>
            <Navigation />
          </HoldMenuProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
