import { StatusBar } from "expo-status-bar";
import { useState, useEffec } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MyDataProvider } from "./context/AsyncStorage";

export default function App() {
  const [peopleDataList, setPeopleDataList] = useState([]);
  return (
    <MyDataProvider>
      <View>
        <Text>Hello asdfsdfsafs</Text>
      </View>
    </MyDataProvider>
  );
}
