import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { ListItemSwipeable, ListItemEmpty } from "./ListItemSwipeable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PeopleScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
  const [scrollvalue, setScrollValue] = useState(0);
  const scrollEvent = (ev) => {
    setScrollValue(ev.nativeEvent.contentOffset.y);
  };
  return (
    <>
      <BlurView
        style={{
          zIndex: 10000,
          backgroundColor: scrollvalue > 30 ? "transparent" : theme.colors.dark,
          top: 0,
          position: "absolute",
          height: insets.top,
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: insets.bottom,
          justifyContent: "center",
        }}
        intensity={scrollvalue > 30 ? 70 : 0}
        tint="dark"
      ></BlurView>
      <View
        style={{
          zIndex: 0,
          flex: 1,
          // paddingTop: insets.top,
          backgroundColor: theme.colors.dark,
        }}
      >
        <FlatList
          data={sortedMonths.map((month) => ({
            month,
            people: peopleGroups[month],
          }))}
          ListHeaderComponent={<HeaderItemContainer navigation={navigation} />}
          renderItem={({ item }) => (
            <RenderItemContainer data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => {
            return `id-people-${item.month}`;
          }}
          style={{
            backgroundColor: "red",
            paddingTop: insets.top,
            backgroundColor: theme.colors.dark,
          }}
          onScroll={(ev) => {
            scrollEvent(ev);
          }}
          ListEmptyComponent={<ListItemEmpty />}
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
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: insets.bottom,
          justifyContent: "center",
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
        style={{ flex: 1, marginHorizontal: 20, paddingVertical: 15 }}
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
            marginVertical: 15,
            backgroundColor: theme.colors.deletePressed,
          }}
        >
          {data.people.map((person) => {
            return <ListItemSwipeable data={person} key={person.id} />;
          })}
        </View>
      </View>
    </>
  );
};
const HeaderItemContainer = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
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
    </View>
  );
};
export default PeopleScreen;
