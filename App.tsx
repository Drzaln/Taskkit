import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./Navigation";
import store from "./Redux/store";
import Calendars from "./screens/Tabs/Calendar";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
