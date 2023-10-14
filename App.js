import { StatusBar } from "expo-status-bar";
import { useState, useEffec } from "react";
import { StyleSheet, Text, View } from "react-native";
// screens
import PeopleScreen from "./screens/PeopleScreen/PeopleScreen";
// screens
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// navigation
// context
import { MyDataProvider } from "./context/AsyncStorage";
// context
// safe area
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// safe area

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <MyDataProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          edges={["right", "bottom", "left", "top"]}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="List of People" component={PeopleScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </MyDataProvider>
  );
}
