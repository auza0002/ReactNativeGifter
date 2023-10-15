import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { ListItemSwipeable, ListItemEmpty } from "./ListItemSwipeable";
const PeopleScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [dataUser] = useMyData([]);
  const sortedPeople = [...dataUser];
  sortedPeople.sort((a, b) => {
    const dateA = new Date(a.dob);
    const dateB = new Date(b.dob);
    if (dateA.getMonth() === dateB.getMonth()) {
      return dateA.getDate() - dateB.getDate();
    }
    return dateA.getMonth() - dateB.getMonth();
  });
  const peopleGroups = [];
  let currentMonth = null;
  let currentGroup = null;
  for (const person of sortedPeople) {
    const [month] = person.dob.split("-").slice(1);
    if (currentMonth !== month) {
      currentMonth = month;
      currentGroup = [];
      peopleGroups.push({ month, people: currentGroup });
    }
    currentGroup.push(person);
  }
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

        <Ionicons
          name="md-add-circle-sharp"
          size={40}
          color={theme.colors.yellow}
        />
      </View>
      <FlatList
        data={peopleGroups}
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
          backgroundColor: theme.colors.background,
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
