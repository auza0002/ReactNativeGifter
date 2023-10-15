import PeopleScreen from "./screens/PeopleScreen/PeopleScreen";
import IdeaScreen from "./screens/IdeaScreen/IdeaScreen";
import AddPersonScreen from "./screens/AddPersonScreen/AddPersonScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen/AddIdeaScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDataProvider } from "./context/AsyncStorage";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { createTheme } from "@rneui/themed";
const Stack = createNativeStackNavigator();
const theme = createTheme({
  colors: {
    background: "#444444", // A slightly darker background color
    error: {
      background: "#22222222",
      text: "#cc0000",
    },
    dark: "#000000",

    light: "#ffffff",
    primaryPressed: "#444444",
    delete: "#ff0000",
    deletePressed: "#cc0000",
    yellow: "#ffd500",
    text: {
      white: "#ffffff",
      primary: "#dddddd",
      secondary: "#bbbbbb",
    },
  },
  typography: {
    title: {
      fontSize: 36,
      fontWeight: "bold",
    },
    title2: {
      fontSize: 32,
      fontWeight: "bold",
    },
    title3: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    body: {
      fontSize: 20,
      fontWeight: "normal",
    },
    bodyLarge: {
      fontSize: 24,
      fontWeight: "normal",
    },
    small: {
      fontSize: 14,
      fontWeight: "normal",
    },
  },
});
export default function App() {
  return (
    <MyDataProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ backgroundColor: "#000000", flex: 1, padding: 10 }}
            edges={["bottom", "top"]}
          >
            <NavigationContainer initialRouteName="People list">
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="People list" component={PeopleScreen} />
                <Stack.Screen name="Add Screen" component={AddPersonScreen} />
                <Stack.Screen name="Idea Screen" component={IdeaScreen} />
                <Stack.Screen
                  name="Add Idea Screen"
                  component={AddIdeaScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </MyDataProvider>
  );
}
