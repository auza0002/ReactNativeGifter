import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";

// function to save data
const storageData = async (newValue) => {
  try {
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem("Reac_Gifter_App_Storage", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// function to get Data
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Reac_Gifter_App_Storage");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const MyDataContext = createContext();

function MyDataProvider(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((dataResult) => {
      setData(dataResult);
    });
  }, []);

  async function updateStorageData(list) {
    await storageData(list);
    setData(list);
  }

  return (
    <MyDataContext.Provider value={[data, updateStorageData]} {...props} />
  );
}

function useMyData() {
  return useContext(MyDataContext) || [];
}

export { useMyData, MyDataProvider };
