import { Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CameraIdea from "./Camera.Idea";
import { useTheme } from "@rneui/themed";
const AddIdeaScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { id } = route.params;
  console.log("id", id);
  return (
    <View style={{ padding: 50 }}>
      <Text>Add your ideas</Text>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Go to AddIdeaScreen</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Camera Screen", { id });
        }}
      >
        <FontAwesome name="camera" size={24} color="black" />
      </Pressable>
    </View>
  );
};
export default AddIdeaScreen;
