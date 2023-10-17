import { Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { Button } from "@rneui/themed";
import DatePickerScreen from "./DatePickerScreen";
import { ListItem } from "@rneui/themed";
import uuid from "react-native-uuid";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const AddPersonScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("2004/03/10");
  const [dataUser, setDataUser] = useMyData([]);
  const [expanded, setExpanded] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [text, setText] = useState("");
  const updateUserData = [
    ...dataUser,
    {
      id: uuid.v4(),
      name: text,
      dob: selectedDate,
      idea: [],
    },
  ];
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.dark,
        flex: 1,
        alignContent: "space-between",
        justifyContent: "space-between",
        borderColor: theme.colors.background,
        borderTopWidth: 3,
        paddingBottom: insets.bottom,
        paddingHorizontal: 15,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
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
        <View style={{ gap: 20 }}>
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
                padding: 10,
                width: "100%",
                color: theme.colors.text.white,
                fontSize: theme.typography.bodyLarge.fontSize,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.text.primary,
              }}
              onChangeText={(ev) => {
                if (text.trim() === "") {
                  setValidInput(false);
                } else if (text.length == 0) {
                  setValidInput(false);
                } else {
                  setValidInput(true);
                }
                setText(ev);
              }}
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
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate("People list");
          }}
          size="lg"
          radius={"md"}
          title="Cancel"
          type="clear"
          titleStyle={{
            color: "red",
          }}
        />
        <Button
          onPress={() => {
            if (validInput) {
              setDataUser(updateUserData);
              navigation.navigate("People list");
            } else {
              navigation.navigate("People list");
            }
          }}
          radius={"lg"}
          type="clear"
          color={"white"}
          size="lg"
          titleStyle={{
            color: theme.colors.yellow,
          }}
        >
          {validInput ? "Save" : "Done"}
        </Button>
      </View>
    </View>
  );
};
export default AddPersonScreen;
