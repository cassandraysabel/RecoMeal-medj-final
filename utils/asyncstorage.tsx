import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
  try {
    await AsyncStorage.getItem("user-data");
  } catch (err) {
    console.log(err)
  }
};

export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err)
  }
};
