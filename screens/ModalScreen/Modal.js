import { useMyData } from "../../context/AsyncStorage";
import { useTheme } from "@rneui/themed";
import { View, Text } from "react-native";
import { Dialog } from "@rneui/themed";
const DeleteModal = ({ setModal, id, name }) => {
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
        <Dialog.Title title="Dialog Title" />
        <Text>Dialog body text. Add relevant information here.</Text>
        <Dialog.Actions>
          <Dialog.Button
            title={`Delete Person : ${name}`}
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
