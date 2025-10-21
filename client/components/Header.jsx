import { useRouter } from "expo-router";
import React from "react";
import { BackHandler, Pressable, Text, View } from "react-native";

export default function Header({ date_navigator = false, dateLabel, changeDate, errorMsg }) {
  const router = useRouter();

  const handleBack = (router) => {
    if (router.canGoBack()) {
      router.back();
    } else {
      BackHandler.exitApp();
    }
  };

  return (
    <View>
      <View className="px-4 pt-3 pb-2 bg-cyan-500/20">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Pressable onPress={() => handleBack(router)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <View className="w-10 h-10 items-center justify-center">
                <Text className="text-cyan-400 text-xl">‹</Text>
              </View>
            </Pressable>
            {/* <View className="w-11 h-11 bg-cyan-500/20 rounded-xl items-center justify-center">
              <View className="w-6 h-6 bg-cyan-400 rounded-md" />
            </View> */}
            <Text className="text-white text-2xl font-semibold tracking-tight">MyFitnessApp</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="w-11 h-11 items-center justify-center">
              <View className="w-6 h-6 border-2 border-neutral-400 rounded-md ">
                <View className="absolute top-1 left-1 right-1 h-0.5 bg-neutral-400" />
                <View className="absolute top-2.5 left-1 right-1 h-0.5 bg-neutral-400" />
                <View className="absolute bottom-1 left-1 right-1 h-0.5 bg-neutral-400" />
              </View>
            </View>

            <View className="w-11 h-11 items-center justify-center">
              <Text className="text-neutral-400 text-3xl font-light">+</Text>
            </View>

            <View className="w-11 h-11 items-center justify-center">
              <View className="flex-col gap-1">
                <View className="w-1 h-1 bg-neutral-400 rounded-full" />
                <View className="w-1 h-1 bg-neutral-400 rounded-full" />
                <View className="w-1 h-1 bg-neutral-400 rounded-full" />
              </View>
            </View>
          </View>
        </View>

        {date_navigator && (
          <View className="flex-row items-center justify-between border-b border-neutral-800">
            <Pressable onPress={() => changeDate(-1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <View className="px-5 py-4">
                <Text className="text-cyan-400 text-xl">‹</Text>
              </View>
            </Pressable>

            <Text className="text-white text-base font-medium tracking-widest">{dateLabel}</Text>

            <Pressable onPress={() => changeDate(1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <View className="px-5 py-4">
                <Text className="text-cyan-400 text-xl">›</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>

      {errorMsg && (
        <View className="bg-red-600 px-4 py-3">
          <Text className="text-white text-center font-medium">{errorMsg}</Text>
        </View>
      )}
    </View>
  );
}
