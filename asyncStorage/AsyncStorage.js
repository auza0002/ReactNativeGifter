import AsyncStorage from "@react-native-async-storage/async-storage";
const people = [
  {
    id: "d825796c-4fc1-4879-ad86-048ece61358b",
    name: "Mr Man",
    dob: "1983-07-22",
    ideas: [],
  },
  {
    id: "a2a9f7d0-251d-4d2b-aac2-6f7b4cc50b3f",
    name: "Ms. Woman",
    dob: "1990-04-15",
    ideas: [],
  },
  {
    id: "b6a5e3a8-9e21-47c4-a3f2-81ce3625b7de",
    name: "Dr. Scientist",
    dob: "1975-12-03",
    ideas: [],
  },
  {
    id: "e3f4c5d9-8b7a-4d7c-9e2d-6a1b8d7f3a9c",
    name: "Mrs. Smith",
    dob: "1989-08-30",
    ideas: [],
  },
];
// function to save data
const storageData = async (value) => {
  try {
    value = JSON.stringify(value);
    // for objects use the JSON.stringify method
    await AsyncStorage.setItem("React_Gifter_App_Storage", value);
  } catch (e) {
    // saving error
  }
};
