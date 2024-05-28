import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data)
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

