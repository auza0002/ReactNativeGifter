import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyDataContext = createContext(); // Create the context object

function MyDataProvider(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("React_Native_App_Gifter").then((list) => {
      list = list === null ? [] : JSON.parse(list);
      setData(list);
    });
  }, []);

  async function updateStorageData(list) {
    setData(list);
    await AsyncStorage.setItem("React_Native_App_Gifter", JSON.stringify(list));
  }
  function deletePersonById(id) {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    AsyncStorage.setItem("React_Native_App_Gifter", JSON.stringify(newData));
  }
  function getPersonById(id) {
    return data.find((item) => item.id === id);
  }
  async function updatePersonIdea(id, newIdea) {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          idea: [...item.idea, newIdea],
        };
      }
      return item;
    });
    setData(newData);
    await AsyncStorage.setItem(
      "React_Native_App_Gifter",
      JSON.stringify(newData)
    );
  }

  function deletePersonIdea(id, ideaId) {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          idea: item.idea.filter((idea) => idea.id !== ideaId),
        };
      }
      return item;
    });
    setData(newData);
    AsyncStorage.setItem("React_Native_App_Gifter", JSON.stringify(newData));
  }

  return (
    <MyDataContext.Provider
      value={[
        data,
        updateStorageData,
        getPersonById,
        updatePersonIdea,
        deletePersonIdea,
        deletePersonById,
      ]}
    >
      {props.children}
    </MyDataContext.Provider>
  );
}

function useMyData() {
  const context = useContext(MyDataContext);

  if (!context) throw new Error("Not inside the Provider");
  return context;
}

export { useMyData, MyDataProvider };
