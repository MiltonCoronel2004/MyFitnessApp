import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import Header from "../components/Header";
// import * as SQLite from "expo-sqlite";

const WORKOUTS = [
  {
    id: "1",
    name: "Curl Bíceps + Martillo",
    sets: [
      { weight: 15, reps: 12 },
      { weight: 17.5, reps: 10 },
      { weight: 20, reps: 8 },
    ],
  },
  {
    id: "2",
    name: "Remo con Barra",
    sets: [
      { weight: 40, reps: 10 },
      { weight: 45, reps: 8 },
      { weight: 50, reps: 6 },
    ],
  },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isToday = currentDate.toDateString() === new Date().toDateString();
  const dateLabel = isToday ? "Hoy" : currentDate.toISOString().split("T")[0];

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // useEffect(() => {
  //   console.log(`currentDate: ${currentDate}`);
  //   console.log(`new Date: ${currentDate}`);
  // }, [currentDate]);

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <StatusBar style="light" />
      <Header date_navigator changeDate={changeDate} dateLabel={dateLabel} />

      {WORKOUTS.length > 0 ? (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
          <View className="flex-1 items-center justify-center py-32 px-4">
            <View className="items-center gap-6">
              <View className="w-20 h-20 bg-neutral-900 rounded-full items-center justify-center">
                <Text className="text-neutral-700 text-4xl font-light">∅</Text>
              </View>
              <Text className="text-neutral-600 text-base font-medium tracking-wide">Workout Log Empty</Text>
            </View>

            <View className="w-full px-4 gap-3 mt-12">
              <Link asChild href="/CategoryList">
                <Pressable>
                  <View className="bg-cyan-500 py-4 rounded-2xl items-center flex-row justify-center gap-2">
                    <Text className="text-cyan-950 text-lg font-semibold">+</Text>
                    <Text className="text-cyan-950 text-base font-semibold tracking-wide">Start New Workout</Text>
                  </View>
                </Pressable>
              </Link>

              <Pressable className="bg-neutral-900 py-4 rounded-2xl items-center flex-row justify-center gap-2 border border-neutral-800">
                <View className="w-5 h-5 border-2 border-neutral-400 rounded">
                  <View className="absolute top-1 left-1 right-1 h-0.5 bg-neutral-400" />
                  <View className="absolute top-2.5 left-1 right-1 h-0.5 bg-neutral-400" />
                  <View className="absolute bottom-1 left-1 right-1 h-0.5 bg-neutral-400" />
                </View>
                <Text className="text-neutral-300 text-base font-medium tracking-wide">Copy Previous Workout</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 16, paddingTop: 16 }}>
          {WORKOUTS.map((w) => (
            <View key={w.id} className="mb-4 rounded-2xl bg-neutral-900 border border-neutral-800" style={{ padding: 16 }}>
              <Text className="text-white text-base font-semibold mb-2">{w.name}</Text>
              {w.sets.map((s, i) => (
                <View key={i} className="flex-row items-center justify-between py-2">
                  <Text className="text-neutral-400">Set {i + 1}</Text>
                  <Text className="text-neutral-200">
                    {s.weight} kg × {s.reps}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
