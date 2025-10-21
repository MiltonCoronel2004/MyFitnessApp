import { View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Link } from "expo-router";
import CreateCategoryModal from "../components/CreateCategoryModal";
import { useState } from "react";
import { useEffect } from "react";
import { getAnonymousId } from "../utils/utils";

const url = process.env.EXPO_PUBLIC_API_URL;

export default function CategoryList() {
  const insets = useSafeAreaInsets();
  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateCategory = async () => {
    try {
      const anon_id = await getAnonymousId();

      if (!name) return setErrorMsg("El nombre es obligatorio");
      if (!anon_id) return setErrorMsg("Falta el ID Anonimo");

      const res = await fetch(`${url}/api/categories/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, anon_id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        setErrorMsg(data.errors.name);
        return;
      }
      await getAllCategories();
      handleCloseModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setName("");
  };

  useEffect(() => {
    if (!errorMsg) return;
    const timer = setTimeout(() => setErrorMsg(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const getAllCategories = async () => {
    try {
      const anon_id = await getAnonymousId();
      const res = await fetch(`${url}/api/categories/view/all/${anon_id}`);
      const data = await res.json();
      if (!res.ok) return console.error(data);
      setCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllCategories();
      setLoading(false);
    })();
  }, []);

  const handleCategoryPress = (categoryId) => {
    console.log("Category pressed:", categoryId);
  };

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-[#0a0a0a]">
        <View className="relative w-24 h-24">
          <View
            className="absolute inset-0 bg-cyan-500 rounded-full"
            style={{
              shadowColor: "#06b6d4",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 20,
              elevation: 10,
            }}
          />
          <View className="absolute inset-2 bg-[#0a0a0a] rounded-full" />
          <View className="absolute inset-0 items-center justify-center">
            <View
              className="w-3 h-3 bg-cyan-400 rounded-full"
              style={{
                shadowColor: "#22d3ee",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 10,
              }}
            />
          </View>
        </View>
        <View className="mt-8 flex-row gap-1">
          <View className="w-2 h-2 bg-cyan-500 rounded-full" />
          <View className="w-2 h-2 bg-purple-500 rounded-full" />
          <View className="w-2 h-2 bg-pink-500 rounded-full" />
        </View>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <StatusBar style="light" />
      <CreateCategoryModal isOpen={createModal} onClose={() => handleCloseModal()} name={name} setName={setName} onConfirm={handleCreateCategory} />

      <View style={{ position: "absolute", top: insets.top, left: 0, right: 0, zIndex: 10 }}>
        <Header errorMsg={errorMsg} />
      </View>

      {categories.length > 0 ? (
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 24,
            paddingTop: 80,
          }}
        >
          <Text className="text-white text-xl font-semibold tracking-tight mb-4">Exercise Categories</Text>

          <View className="gap-3">
            {categories.map((category) => (
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
                    <Text className="text-neutral-500 text-sm">{category.exerciseCount ?? 0} ejercicios</Text>
                  </View>
                </View>

                <Text className="text-neutral-600 text-xl">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingBottom: insets.bottom + 24,
          }}
        >
          <View className="items-center justify-center px-4">
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
