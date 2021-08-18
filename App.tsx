import { Feather } from "@expo/vector-icons";
import React from "react";
import { HoldMenuProvider } from "react-native-hold-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./BottomTabNav";
import useCachedResources from "./hooks/useCachedResources";
import store, { persistor, RootState } from "./Redux/store";
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <HoldMenuProvider iconComponent={Feather} theme={"light"}>
              <Navigation />
            </HoldMenuProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
