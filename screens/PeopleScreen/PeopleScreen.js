import { Pressable, Text, View, FlatList } from "react-native";
import { useMyData } from "../../context/AsyncStorage";
const PeopleScreen = ({ navigation }) => {
  const [data, setData] = useMyData([]);
  console.log(data);
  return (
    <View>
      <Text>People list</Text>
      {/* <FlatList /> */}
      {/* <Pressable
        onPress={() => {
          navigation.navigate("Add Screen");
        }}
      >
        <Text>Players</Text>
      </Pressable> */}
    </View>
  );
};
const peopleList = (data) => {
  return <Text>Hello there</Text>;
};
export default PeopleScreen;
