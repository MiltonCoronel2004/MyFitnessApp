import { View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Link } from "expo-router";
import CreateCategoryModal from "../components/CreateCategoryModa";
import { useState } from "react";

const CATEGORIES = [];

export default function CategoryList() {
  const insets = useSafeAreaInsets();
  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const createCategory = await fetch("http://localhost:3000/api/categories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCategoryPress = (categoryId) => {
    console.log("Category pressed:", categoryId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <StatusBar style="light" />
      <CreateCategoryModal isOpen={createModal} onClose={() => setCreateModal(false)} name={name} setName={setName} onConfirm={createCategory} />
      <Header />

      {CATEGORIES.length > 0 ? (
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 24,
            paddingTop: 16,
          }}
        >
          <Text className="text-white text-xl font-semibold tracking-tight mb-4">Exercise Categories</Text>

          <View className="gap-3">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex-row items-center justify-between active:bg-neutral-800"
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-12 h-12 ${category.color} rounded-xl items-center justify-center`}>
                    <View className={`w-6 h-6 ${category.accentColor} rounded-md`} />
                  </View>

                  <View>
                    <Text className="text-white text-base font-semibold">{category.name}</Text>
                    <Text className="text-neutral-500 text-sm">{category.exerciseCount} exercises</Text>
                  </View>
                </View>

                <Text className="text-neutral-600 text-xl">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
          <View className="flex-1 items-center justify-center py-32 px-4">
            <View className="items-center gap-6">
              <View className="w-20 h-20 bg-neutral-900 rounded-full items-center justify-center">
                <Text className="text-neutral-700 text-4xl font-light">∅</Text>
              </View>
              <Text className="text-neutral-600 text-base font-medium tracking-wide">Aún no hay categorías</Text>
            </View>

            <View className="w-full px-4 gap-3 mt-12">
              <Pressable onPress={() => setCreateModal(true)}>
                <View className="bg-cyan-500 py-4 rounded-2xl items-center flex-row justify-center gap-2">
                  <Text className="text-cyan-950 text-lg font-semibold">+</Text>
                  <Text className="text-cyan-950 text-base font-semibold tracking-wide">Crear Nueva Categoría</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
