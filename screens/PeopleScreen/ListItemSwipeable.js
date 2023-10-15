import { ListItem } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMyData } from "../../context/AsyncStorage";
import { Button } from "@rneui/themed";
import { View, Text } from "react-native";
const ListItemSwipeable = ({ data }) => {
  const [dataUser, setDataUser] = useMyData([]);
  const { theme } = useTheme();
  return (
    <ListItem.Swipeable
      rightWidth={90}
      minSlideWidth={40}
      rightContent={() => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: theme.colors.deletePressed,
          }}
          type="clear"
          icon={{ name: "delete-outline", color: theme.colors.text.white }}
          onPress={() => {
            const newData = dataUser.filter((item) => item.id !== data.id);
            setDataUser(newData);
          }}
        />
      )}
    >
      <ListItem
        style={{
          flexDirection: "row",
        }}
      >
        <FontAwesome5
          name="gifts"
          size={24}
          color={theme.colors.text.secondary}
        />
        <ListItem.Content style={{ flex: 1, borderRadius: 25 }}>
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
  const { theme } = useTheme();
  console.log("ListItemEmpty");
  return (
    <View>
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.title3.fontSize,
          fontWeight: theme.typography.title3.fontWeight,
        }}
      >
        List is empty
      </Text>
      <Text
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.body.fontSize,
        }}
      >
        Ready to add people to the list!
      </Text>
    </View>
  );
};
export { ListItemSwipeable, ListItemEmpty };
