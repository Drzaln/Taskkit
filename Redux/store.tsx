import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import asyncStorage from "@react-native-async-storage/async-storage";
import TaskReducer from "./TaskReducer";

const persistConfig = {
  key: "root",
  storage: asyncStorage,
};
const persistedReducer = persistReducer(persistConfig, TaskReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
