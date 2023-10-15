import { Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import DatePickerScreen from "./DatePickerScreen";
const AddPersonScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dataUser, setDataUser] = useMyData([]);
  const [num, setNum] = useState(0);
  const [text, onChangeText] = useState("");

  const { theme } = useTheme();
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
        <Pressable
          onPress={() => {
            navigation.navigate("People list");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={theme.colors.light}
            />
            <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }}>
              <Text
                style={{
                  color: theme.colors.text.white,
                }}
              >
                Back
              </Text>
            </View>
          </View>
        </Pressable>
        <Text
          style={{
            color: theme.colors.text.white,
            fontSize: theme.typography.title.fontSize,
            fontWeight: theme.typography.title.fontWeight,
          }}
        >
          Add Person
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <TextInput
            style={{
              height: 60,
              padding: 10,
              width: "100%",
              color: theme.colors.text.white,
              fontSize: theme.typography.bodyLarge.fontSize,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.text.primary,
            }}
            onChangeText={onChangeText}
            value={text}
            placeholder="Name"
            keyboardType="default"
            maxLength={20}
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <DatePickerScreen setSelectedDate={setSelectedDate} />
      </View>
    </View>
  );
};
export default AddPersonScreen;

//   {
//     id: 123,
//     name: "Person Diego",
//     dob: "1999-01-12",
//     ideas: [],
//   },
//   {
//     id: 1,
//     name: "Person 1",
//     dob: "1999-12-30",
//     ideas: [],
//   },
//   {
//     id: 2,
//     name: "Person 1",
//     dob: "1999-12-01",
//     ideas: [],
//   },
//   {
//     id: 3,
//     name: "Person 2",
//     dob: "2000-03-10",
//     ideas: [],
//   },
//   {
//     id: 4,
//     name: "Person 3",
//     dob: "1995-07-10",
//     ideas: [],
//   },
//   {
//     id: 5,
//     name: "Person 4",
//     dob: "1988-11-02",
//     ideas: [],
//   },
//   {
//     id: 6,
//     name: "Person 5",
//     dob: "1992-05-20",
//     ideas: [],
//   },
//   {
//     id: 7,
//     name: "Person 5",
//     dob: "1992-05-10",
//     ideas: [],
//   },
//   {
//     id: 8,
//     name: "Person 5",
//     dob: "1992-05-21",
//     ideas: [],
//   },
//   {
//     id: 9,
//     name: "Mr Man",
//     dob: "1983-07-22",
//     ideas: [],
//   },
//   {
//     id: 10,
//     name: "Mr Pedro",
//     dob: "1983-12-22",
//     ideas: [],
//   },
// ];
