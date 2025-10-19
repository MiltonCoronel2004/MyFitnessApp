import { View, Text, TextInput, Modal, Pressable } from "react-native";

export default function CreateCategoryModal({ isOpen, onClose, name, setName, onConfirm }) {
  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/70 justify-center items-center" onPress={onClose}>
        <Pressable className="bg-neutral-900 rounded-2xl p-6 mx-4 w-4/5" onPress={(e) => e.stopPropagation()}>
          <Text className="text-white text-xl font-semibold mb-4">Nueva Categoría</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            className="bg-neutral-800 text-white px-4 py-3 rounded-xl mb-6"
            placeholder="Nombre de la categoría"
            placeholderTextColor="#737373"
          />

          <View className="flex-row gap-3">
            <Pressable className="flex-1 bg-neutral-800 py-3 rounded-xl" onPress={onClose}>
              <Text className="text-neutral-400 text-center font-semibold">Cancelar</Text>
            </Pressable>

            <Pressable onPress={onConfirm} className="flex-1 bg-cyan-500 py-3 rounded-xl">
              <Text className="text-cyan-950 text-center font-semibold">Crear</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
