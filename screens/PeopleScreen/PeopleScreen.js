import { Pressable, Text, View, FlatList } from "react-native";
import { ListItem } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useEffect } from "react";
const PeopleScreen = ({ navigation }) => {
  const { theme, updateTheme } = useTheme();
  const [dataUser, setDataUser] = useMyData([]);

  const ListItemSwipeable = ({ data }) => {
    return (
      <ListItem.Swipeable
        leftWidth={80}
        rightWidth={90}
        minSlideWidth={40}
        rightContent={(action) => (
          <Button
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: theme.colors.deletePressed,
            }}
            type="clear"
            icon={{ name: "delete-outline", color: theme.colors.text.white }}
            onPress={action}
          />
        )}
      >
        <ListItem
          bottomDivider
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesome5
            name="gifts"
            size={24}
            color={theme.colors.text.secondary}
          />
          <ListItem.Content style={{ flex: 1 }}>
            <ListItem.Title
              style={{
                color: theme.colors.text.white,
                fontSize: theme.typography.body.fontSize,
                fontWeight: theme.typography.subtitle.fontWeight,
              }}
            >
              {data.name}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.small.fontSize,
                fontWeight: theme.typography.small.fontWeight,
              }}
            >
              {data.dob}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color="white" />
        </ListItem>
      </ListItem.Swipeable>
    );
  };
  const ListItemEmpty = () => {
    <View>
      <Text>Empty</Text>
    </View>;
  };
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: theme.colors.text.white,
            fontSize: theme.typography.title.fontSize,
            fontWeight: theme.typography.title.fontWeight,
          }}
        >
          People list
        </Text>
        <Ionicons
          name="md-add-circle-sharp"
          size={40}
          color={theme.colors.yellow}
        />
      </View>
      <FlatList
        data={dataUser}
        renderItem={({ item }) => (
          <ListItemSwipeable data={item} key={item.uid} />
        )}
        ListEmptyComponent={<ListItemEmpty />}
      />
    </View>
  );
};

export default PeopleScreen;

// const people = [
//   {
//     id: "d825796c-4fc1-4879-ad86-048ece61358b999999999999999",
//     name: "Habib",
//     dob: "1987-07-22",
//     ideas: [],
//   },
//   {
//     id: "d825796c-4fc1-4879-ad86-048ece61358b",
//     name: "Mr Man",
//     dob: "1983-07-22",
//     ideas: [],
//   },
//   {
//     id: "unique-id-1",
//     name: "John Doe",
//     dob: "1995-05-15",
//     ideas: [],
//   },
//   {
//     id: "unique-id-2",
//     name: "Jane Smith",
//     dob: "1989-02-10",
//     ideas: [],
//   },
//   {
//     id: "unique-id-3",
//     name: "Alice Johnson",
//     dob: "2001-11-30",
//     ideas: [],
//   },
//   {
//     id: "unique-id-4",
//     name: "Bob Johnson",
//     dob: "1978-03-07",
//     ideas: [],
//   },
// ];
