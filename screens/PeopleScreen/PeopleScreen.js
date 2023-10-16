import { Text, View, FlatList, Pressable } from "react-native";
import { FAB } from "@rneui/themed";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { ListItemSwipeable, ListItemEmpty } from "./ListItemSwipeable";

const PeopleScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [dataUser] = useMyData([]);
  const peopleGroups = dataUser.reduce((groups, person) => {
    const [month, day] = person.dob.split("/").slice(1);
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push({ ...person, day });
    return groups;
  }, {});
  for (const month in peopleGroups) {
    peopleGroups[month].sort((a, b) => {
      if (a.day === b.day) {
        return 0;
      }
      return a.day < b.day ? -1 : 1;
    });
  }
  const sortedMonths = Object.keys(peopleGroups).sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  return (
    <View style={{ backgroundColor: theme.colors.dark, flex: 1 }}>
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
        <FAB
          onPress={() => {
            navigation.navigate("Add Screen");
          }}
          icon={{
            name: "add",
            color: theme.colors.dark,
          }}
          color={theme.colors.yellow}
          size="small"
        />
      </View>
      <FlatList
        data={sortedMonths.map((month) => ({
          month,
          people: peopleGroups[month],
        }))}
        renderItem={({ item }) => <RenderItemContainer data={item} />}
        keyExtractor={(item) => {
          return `id-people-${item.month}`;
        }}
        style={{
          marginTop: 30,
          backgroundColor: theme.colors.dark,
        }}
        ListEmptyComponent={<ListItemEmpty />}
      />
    </View>
  );
};

// Rest of your code remains the same

const RenderItemContainer = ({ data }) => {
  const { theme } = useTheme();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthNumber = parseInt(data.month, 10);
  const monthName = monthNames[monthNumber - 1] || "Unknown";
  return (
    <View
      style={{ flex: 1, marginHorizontal: 10, paddingVertical: 15 }}
      key={data.month}
    >
      <Text
        style={{
          color: theme.colors.text.white,
          fontSize: theme.typography.title3.fontSize,
          fontWeight: theme.typography.title3.fontWeight,
        }}
      >
        {monthName}
      </Text>
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          marginVertical: 5,
          backgroundColor: theme.colors.deletePressed,
        }}
      >
        {data.people.map((person) => {
          return <ListItemSwipeable data={person} key={person.id} />;
        })}
      </View>
    </View>
  );
};
export default PeopleScreen;
