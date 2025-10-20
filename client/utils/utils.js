import { MMKV } from "react-native-mmkv";
import { v4 as uuidv4 } from "uuid";

// Inicializa el almacenamiento nativo
const storage = new MMKV();

// Genera o recupera el ID anónimo
export function getOrCreateAnonymousId() {
  let id = storage.getString("anonymous_id");
  if (!id) {
    id = uuidv4();
    storage.set("anonymous_id", id);
  }
  return id;
}
