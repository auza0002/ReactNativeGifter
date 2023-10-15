import { Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "@rneui/themed";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { Button } from "@rneui/themed";
import DatePickerScreen from "./DatePickerScreen";
import { ListItem } from "@rneui/themed";
import uuid from "react-native-uuid";
const AddPersonScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("2004/03/10");
  const [dataUser, setDataUser] = useMyData([]);
  const [expanded, setExpanded] = useState(false);
  const [text, onChangeText] = useState("");
  const updateUserData = [
    ...dataUser,
    {
      id: uuid.v4(),
      name: text ? text : "Person",
      dob: selectedDate,
      idea: [],
    },
  ];
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.dark,
        flex: 1,
        alignContent: "space-between",
        justifyContent: "space-between",
      }}
    >
      <View>
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
              <View
                style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
              >
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
        <View style={{ gap: 10, padding: 10 }}>
          <View>
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.body.small,
              }}
            >
              Add a person to your list. You can add a name and a date of birth.
            </Text>
          </View>
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
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        color: theme.colors.text.white,
                        fontSize: theme.typography.bodyLarge.fontSize,
                      }}
                    >
                      Date of birth
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{ color: theme.colors.text.secondary }}
                    >
                      {selectedDate}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}
            >
              <ListItem key={`date-picker`} bottomDivider>
                <ListItem.Content>
                  <DatePickerScreen setSelectedDate={setSelectedDate} />
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate("People list");
          }}
          size="lg"
          radius={"md"}
          title="Cancel"
          type="outline"
          buttonStyle={{
            borderColor: "red",
            borderWidth: 2,
          }}
          titleStyle={{
            color: "red",
          }}
        />
        <Button
          onPress={() => {
            setDataUser(updateUserData);
            // set time out to wait for the data to be updated
            setTimeout(() => {
              navigation.navigate("People list");
            }, 3000);
          }}
          radius={"md"}
          type="solid"
          color={"blue"}
          size="lg"
        >
          Save
          <Icon name="save" color="white" />
        </Button>
      </View>
    </View>
  );
};
export default AddPersonScreen;
