"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../../../store/store";
import { PersistGate } from "redux-persist/integration/react";
export const GlobalProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
