import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { ListItemSwipeable, ListItemEmpty } from "./ListItemSwipeable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../theme/Theme";

const PeopleScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [dataUser, setDataUser] = useMyData([]);
  const [scroll, setscroll] = useState(0);
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
  const scrollEvent = (event) => {
    setscroll(event.nativeEvent.contentOffset.y);
  };
  return (
    <>
      <BlurView
        style={{
          zIndex: 10000,
          backgroundColor: scroll > 25 ? "transparent" : theme.colors.dark,
          top: 0,
          position: "absolute",
          height: insets.top,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        intensity={scroll > 25 ? 70 : 0}
        tint="dark"
      ></BlurView>
      <View
        style={{
          zIndex: 0,
          flex: 1,
          backgroundColor: theme.colors.dark,
        }}
      >
        <FlatList
          data={sortedMonths.map((month) => ({
            month,
            people: peopleGroups[month],
          }))}
          ListHeaderComponent={<HeaderItemContainer />}
          renderItem={({ item }) => (
            <RenderItemContainer data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => {
            return `id-people-${item.month}`;
          }}
          ListEmptyComponent={<ListItemEmpty />}
          ListFooterComponent={dataUser.length != 0 ? <EndComponent /> : null}
          onScroll={scrollEvent}
          style={{
            marginHorizontal: 20,
          }}
        />
      </View>
      <BlurView
        style={{
          zIndex: 10000,
          backgroundColor:
            dataUser.length > 5 ? "transparent" : theme.colors.dark,
          bottom: 0,
          position: "absolute",
          height: 80,
          width: "100%",
          flexDirection: "row",
          paddingBottom: insets.bottom,
          justifyContent: "center",
          alignItems: "center",
        }}
        intensity={dataUser.length > 5 ? 70 : 0}
        tint="dark"
      >
        <Text style={{ color: theme.colors.text.white }}>
          {dataUser.length} Gifts
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
            navigation.navigate("Add Screen");
          }}
        >
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={30}
            color={theme.colors.yellow}
          />
        </Pressable>
      </BlurView>
    </>
  );
};
const RenderItemContainer = ({ data, navigation }) => {
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
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: 5,
        }}
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
            marginVertical: 10,
            backgroundColor: theme.colors.deletePressed,
          }}
        >
          {data.people.map((person) => {
            return (
              <ListItemSwipeable
                data={person}
                key={person.id}
                navigation={navigation}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};
const HeaderItemContainer = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 10,
        marginTop: 60,
        borderBottomColor: theme.colors.background,
        borderBottomWidth: 2,
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
    </View>
  );
};
const EndComponent = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginBottom: 100,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderTopColor: theme.colors.background,
        borderTopWidth: 1,
      }}
    >
      <Text
        style={{
          color: theme.colors.text.secondary,
          padding: 10,
          fontSize: theme.typography.small.fontSize,
          fontWeight: theme.typography.small.fontWeight,
        }}
      >
        End of the list
      </Text>
    </View>
  );
};
export default PeopleScreen;
