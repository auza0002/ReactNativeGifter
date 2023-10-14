import { StatusBar } from "expo-status-bar";
import { useState, useEffec } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MyDataProvider } from "./context/AsyncStorage";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import PeopleScreen from "./screens/PeopleScreen";

export default function App() {
  return (
    <MyDataProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          edges={["right", "bottom", "left", "top"]}
        >
          <PeopleScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </MyDataProvider>
  );
}
