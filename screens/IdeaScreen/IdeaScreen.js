import { useMyData } from "../../context/AsyncStorage";
import { Avatar } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { FlatList, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import { color } from "@rneui/base";
const IdeaScreen = ({ navigation, route }) => {
  const [dataUser, setDataUser, getPersonById] = useMyData([]);
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { id } = route.params;
  const user = getPersonById(id);

  return (
    <View
      style={{
        backgroundColor: theme.colors.dark,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.yellow} />
          <View
            style={{
              borderBottomColor: theme.colors.yellow,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: theme.colors.yellow,
                fontSize: theme.typography.small.fontSize,
                fontWeight: theme.typography.small.fontWeight,
              }}
            >
              All list
            </Text>
          </View>
        </Pressable>
        <Text
          style={{
            color: theme.colors.text.white,
            fontSize: theme.typography.title.fontSize,
            fontWeight: theme.typography.title.fontWeight,
          }}
        >
          Gift ideas
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.bodyLarge.fontSize,
              fontWeight: theme.typography.bodyLarge.fontWeight,
            }}
          >
            Person name :
          </Text>
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.body.fontSize,
              fontWeight: theme.typography.body.fontWeight,
            }}
          >
            {user.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.bodyLarge.fontSize,
              fontWeight: theme.typography.bodyLarge.fontWeight,
            }}
          >
            Person DOB :
          </Text>
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.body.fontSize,
              fontWeight: theme.typography.body.fontWeight,
            }}
          >
            {user.dob}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.bodyLarge.fontSize,
              fontWeight: theme.typography.bodyLarge.fontWeight,
            }}
          >
            Person ideas :
          </Text>
          <Text
            style={{
              color: theme.colors.text.white,
              fontSize: theme.typography.body.fontSize,
              fontWeight: theme.typography.body.fontWeight,
            }}
          >
            {user.idea.length}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 15,
          marginHorizontal: 20,
          marginBottom: 60,
        }}
      >
        <FlatList
          data={user.idea}
          renderItem={({ item }) => (
            <RenderItemContainer data={item} personId={id} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ListItemEmpty />}
        />
      </View>
      <View
        style={{
          zIndex: 10000,
          backgroundColor: theme.colors.dark,
          left: 0,
          bottom: 0,
          position: "absolute",
          height: 80,
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: insets.bottom,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: theme.colors.text.white }}>
          {user.idea.length} Gifts
        </Text>
        <Pressable
          style={{
            borderRadius: 50,
            bottom: insets.bottom,
            padding: 10,
            position: "absolute",
            right: 20,
          }}
          onPress={() => {
            navigation.navigate("Add Idea Screen", { id: user.id });
          }}
        >
          <SimpleLineIcons name="note" size={24} color={theme.colors.yellow} />
        </Pressable>
      </View>
    </View>
  );
};
export default IdeaScreen;
const RenderItemContainer = ({ data, personId }) => {
  const [
    dataUser,
    setDataUser,
    getPersonById,
    updatePersonIdea,
    deletePersonIdea,
  ] = useMyData([]);

  const { theme } = useTheme();
  return (
    <>
      <ListItem.Swipeable
        leftWidth={80}
        rightWidth={90}
        minSlideWidth={40}
        rightContent={(reset) => (
          <Button
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: theme.colors.deletePressed,
            }}
            type="clear"
            icon={{
              name: "delete-outline",
              color: theme.colors.text.white,
            }}
            onPress={() => {
              reset();
              setTimeout(() => {
                deletePersonIdea(personId, data.id);
              }, 800);
            }}
          />
        )}
      >
        {data.image == null ? (
          <Avatar
            rounded
            icon={{
              name: "gift-outline",
              type: "ionicon",
              size: 26,
            }}
            containerStyle={{ backgroundColor: "#c2c2c2" }}
          />
        ) : (
          <Avatar rounded source={{ uri: `${data.image}` }} />
        )}

        <ListItem.Content>
          <ListItem.Title
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              color: theme.colors.text.white,
              fontWeight: theme.typography.bodyLarge.fontWeight,
            }}
          >
            {data.text == "" ? "..." : data.text}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: theme.colors.text.secondary }}>
            Gift Idea
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    </>
  );
};
const ListItemEmpty = () => {
  const { theme } = useTheme();
  return (
    <View>
      <Text
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.body.fontSize,
        }}
      >
        Ready to add gifts to the list!
      </Text>
    </View>
  );
};
