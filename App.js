import { StatusBar } from "expo-status-bar";
import { useState, useEffec } from "react";
import { StyleSheet, Text, View } from "react-native";
// screens
import PeopleScreen from "./screens/PeopleScreen/PeopleScreen";
import IdeaScreen from "./screens/IdeaScreen/IdeaScreen";
import AddPersonScreen from "./screens/AddPersonScreen/AddPersonScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen/AddIdeaScreen";
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
          <NavigationContainer initialRouteName="People list">
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="People list" component={PeopleScreen} />
              <Stack.Screen name="Add Screen" component={AddPersonScreen} />
              <Stack.Screen name="Idea Screen" component={IdeaScreen} />
              <Stack.Screen name="Add Idea Screen" component={AddIdeaScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </MyDataProvider>
  );
}
