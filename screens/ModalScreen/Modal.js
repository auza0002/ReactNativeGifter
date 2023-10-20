import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { View, Text } from "react-native";
import { Dialog } from "@rneui/themed";
import { useState } from "react";
const DeleteModal = ({ id, name }) => {
  const [
    dataUser,
    setDataUser,
    getPersonById,
    updatePersonIdea,
    deletePersonIdea,
    deletePersonById,
  ] = useMyData([]);

  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <View style={{ backgroundColor: "red" }}>
          <Dialog.Title title="Dialog Title" />
          <Text style={{ color: "white" }}>
            Are you sure you want to delete this person? : {name}
          </Text>
          <Dialog.Actions>
            <Dialog.Button
              style={{
                color: "red",
                backgroundColor: "white",
              }}
              title={`Delete`}
              onPress={() => {
                toggleDialog();
                deletePersonById(id);
              }}
            />
            <Dialog.Button
              title="Cancel"
              onPress={() => {
                toggleDialog();
              }}
            />
          </Dialog.Actions>
        </View>
      </Dialog>
    </>
  );
};

const showGiftImageModal = ({ id }) => {
  return (
    <View>
      <Text>Gift Image</Text>
    </View>
  );
};

export { DeleteModal, showGiftImageModal };
