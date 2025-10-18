import { Link } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 px-6 justify-center">
        <View className="gap-4">
          <Link asChild href="/">
            <Pressable>
              <Text className="text-white text-center text-lg font-semibold bg-slate-800 py-4 px-6 rounded-2xl border border-slate-700">Inicio</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
