import { Link } from "expo-router";
import { View, Text, Pressable, TextInput, StatusBar } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Register() {
  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 justify-center">
        <View className="absolute top-12 left-6">
          <Link asChild href="/">
            <Pressable>
              <View className="w-10 h-10 items-center justify-center">
                <FontAwesome name="arrow-left" size={24} color="#94a3b8" />
              </View>
            </Pressable>
          </Link>
        </View>

        <View className="mb-12">
          <Text className="text-white text-4xl font-bold mb-2">Crear Cuenta</Text>
          <Text className="text-slate-400 text-base">Comienza tu transformación</Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Nombre</Text>
            <TextInput
              className="bg-slate-800 text-white py-4 px-4 rounded-xl border border-slate-700"
              placeholder="Tu nombre"
              placeholderTextColor="#64748b"
              autoCapitalize="words"
            />
          </View>

          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Email</Text>
            <TextInput
              className="bg-slate-800 text-white py-4 px-4 rounded-xl border border-slate-700"
              placeholder="tu@email.com"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Contraseña</Text>
            <TextInput
              className="bg-slate-800 text-white py-4 px-4 rounded-xl border border-slate-700"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-slate-400 text-sm mb-2 ml-1">Confirmar Contraseña</Text>
            <TextInput
              className="bg-slate-800 text-white py-4 px-4 rounded-xl border border-slate-700"
              placeholder="••••••••"
              placeholderTextColor="#64748b"
              secureTextEntry
            />
          </View>

          <View className="bg-indigo-600 py-4 px-6 rounded-2xl mt-4">
            <Pressable>
              <Text className="text-white text-center text-lg font-semibold">Registrarse</Text>
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center gap-2 mt-6">
            <Text className="text-slate-500">¿Ya tienes cuenta?</Text>
            <Link asChild href="/login">
              <Pressable>
                <Text className="text-indigo-400 font-semibold">Inicia Sesión</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
