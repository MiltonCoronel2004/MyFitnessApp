import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export async function getAnonymousId() {
  const existingId = await AsyncStorage.getItem("anonymous_user_id");
  if (existingId) return existingId;

  const newId = uuidv4();
  await AsyncStorage.setItem("anonymous_user_id", newId);
  return newId;
}
