import PeopleScreen from "./screens/PeopleScreen/PeopleScreen";
import IdeaScreen from "./screens/IdeaScreen/IdeaScreen";
import AddPersonScreen from "./screens/AddPersonScreen/AddPersonScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen/AddIdeaScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDataProvider } from "./context/AsyncStorage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import theme from "./theme/Theme";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MyDataProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer initialRouteName="People list">
            <Stack.Navigator>
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="People list" component={PeopleScreen} />
                <Stack.Screen name="Idea Screen" component={IdeaScreen} />
              </Stack.Group>

              <Stack.Group
                screenOptions={{
                  presentation: "modal",
                  title: "Add Person",
                  headerShown: false,
                  cardStyle: { backgroundColor: "transparent" },
                  cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                      backgroundColor: "rgba(0, 0, 0, " + progress + ")",
                    },
                  }),
                }}
              >
                <Stack.Screen name="Add Screen" component={AddPersonScreen} />
                <Stack.Screen
                  name="Add Idea Screen"
                  component={AddIdeaScreen}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </MyDataProvider>
  );
}
