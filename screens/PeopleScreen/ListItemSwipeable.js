import { ListItem } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMyData } from "../../context/AsyncStorage";
import { Button, Dialog } from "@rneui/themed";
import { View, Text } from "react-native";
import { useState } from "react";

const ListItemSwipeable = ({ data, navigation, setSwipeable }) => {
  const [
    dataUser,
    setDataUser,
    getPersonById,
    updatePersonIdea,
    deletePersonIdea,
    deletePersonById,
  ] = useMyData([]);
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: 10,
        }}
      >
        <Dialog.Title
          titleStyle={{
            color: theme.colors.text.white,
            fontSize: theme.typography.subtitle.fontSize,
            fontWeight: theme.typography.subtitle.fontWeight,
          }}
          title={`Delete`}
        />
        <Text style={{ color: "white" }}>
          This acction will delete the person and all the ideas associated with
          it.
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            style={{
              backgroundColor: theme.colors.delete,
              borderRadius: 10,
            }}
            title={`Delete`}
            titleStyle={{
              color: theme.colors.text.white,
            }}
            onPress={() => {
              toggleDialog();
              deletePersonById(data.id);
            }}
          />
          <Dialog.Button
            title="Cancel"
            titleStyle={{
              color: theme.colors.text.secondary,
            }}
            onPress={() => {
              toggleDialog();
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <ListItem.Swipeable
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
              setVisible(true);
            }}
          />
        )}
      >
        <ListItem
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesome5
            name="gifts"
            size={24}
            color={theme.colors.text.secondary}
          />
          <ListItem.Content
            style={{
              flex: 1,
              borderRadius: 25,
            }}
          >
            <ListItem.Title
              style={{
                color: theme.colors.text.white,
                fontSize: theme.typography.body.fontSize,
                fontWeight: theme.typography.subtitle.fontWeight,
              }}
            >
              {data.name}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.small.fontSize,
                fontWeight: theme.typography.small.fontWeight,
              }}
            >
              {data.dob}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron
            color="white"
            containerStyle={{
              width: 30,
              height: 30,
            }}
            iconStyle={{
              fontSize: 30,
            }}
            onPress={() => {
              navigation.navigate("Idea Screen", { id: data.id });
            }}
          />
        </ListItem>
      </ListItem.Swipeable>
    </>
  );
};
const ListItemEmpty = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginHorizontal: 15,
      }}
    >
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.title3.fontSize,
          fontWeight: theme.typography.title3.fontWeight,
        }}
      >
        List is empty
      </Text>
      <Text
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.body.fontSize,
        }}
      >
        Ready to add people to the list!
      </Text>
    </View>
  );
};
export { ListItemSwipeable, ListItemEmpty };
