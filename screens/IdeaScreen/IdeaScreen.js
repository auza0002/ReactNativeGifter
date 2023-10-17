import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
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
              People list
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
