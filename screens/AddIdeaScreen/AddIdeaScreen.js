import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import { useMyData } from "../../context/AsyncStorage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
const AddIdeaScreen = ({ navigation, route }) => {
  const [dataUser, setDataUser, getPersonById, updatePersonIdea] = useMyData(
    []
  );
  const insets = useSafeAreaInsets();
  const [imageUri, setImageUri] = useState(null);
  const [text, setText] = useState("");
  const { theme } = useTheme();
  const { id } = route.params;
  const { image } = route.params;
  useEffect(() => {
    if (image !== undefined) {
      setImageUri(image);
    }
  }, [image]);
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
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => {
            setText("");
            setImageUri(null);
            navigation.goBack();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
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
              All gifts
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
          New idea
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 80,
        }}
      >
        <TextInput
          style={{
            color: theme.colors.text.white,
            fontSize: theme.typography.bodyLarge.fontSize,
            marginBottom: 20,
          }}
          onFocus={() => {
            return;
          }}
          maxLength={100}
          multiline={true}
          value={text}
          placeholder="Text Idea"
          keyboardType="default"
          onChange={(ev) => {
            setText(ev.nativeEvent.text);
          }}
          placeholderTextColor={theme.colors.text.secondary}
        />
        {imageUri != null ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              aspectRatio: 2 / 3,
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        ) : null}
        <Image />
      </ScrollView>

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
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => {
            if (text.trim() !== "" || imageUri !== null) {
              const newIdea = {
                id: uuid.v4(),
                text: text.trim(),
                image: imageUri,
              };
              updatePersonIdea(id, newIdea);
              setText("");
              setImageUri(null);
              navigation.goBack();
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text
            style={{
              color: theme.colors.yellow,
              fontSize: theme.typography.bodyLarge.fontSize,
            }}
          >
            {text.trim() !== "" || imageUri !== null ? "Save" : "Done"}
          </Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: 50,
            bottom: insets.bottom,
            padding: 10,
            position: "absolute",
            left: 20,
          }}
          onPress={() => {
            navigation.navigate("Camera Screen", { id: id });
          }}
        >
          <MaterialIcons
            name="camera-alt"
            size={30}
            color={
              imageUri == null
                ? theme.colors.yellow
                : theme.colors.primaryPressed
            }
          />
        </Pressable>
      </View>
    </View>
  );
};
export default AddIdeaScreen;
