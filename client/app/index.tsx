import { View, Text, Pressable, StatusBar } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 bg-slate-950">
      {/* Puede ser dark-content */}
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 justify-center">
        <View className="mb-12">
          <Text className="text-white text-5xl font-bold mb-3">MyFitness </Text>
          <Text className="text-slate-400 text-lg">Tu entrenamiento comienza aquí</Text>
        </View>

        <View className="gap-4">
          <Link asChild href="/login">
            <Pressable>
              <Text className="text-white text-center text-lg font-semibold bg-indigo-600 py-4 px-6 rounded-2xl">Iniciar Sesión</Text>
            </Pressable>
          </Link>

          <Link asChild href="/register">
            <Pressable>
              <Text className="text-white text-center text-lg font-semibold bg-slate-800 py-4 px-6 rounded-2xl border border-slate-700">
                Crear Cuenta
              </Text>
            </Pressable>
          </Link>

          <Link asChild href="/dashboard">
            <Pressable>
              <Text className="text-white text-center text-lg font-semibold bg-slate-800 py-4 px-6 rounded-2xl border border-slate-700">
                Dashboard
              </Text>
            </Pressable>
          </Link>
        </View>

        <View className="absolute bottom-22 left-6 right-6">
          <Text className="text-slate-500 text-center text-sm">Transforma tu cuerpo, transforma tu vida</Text>
        </View>
      </View>
    </View>
  );
}
