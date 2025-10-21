import { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import PagerView from "react-native-pager-view";
import Header from "../components/Header";

export default function Index() {
  const insets = useSafeAreaInsets();
  const pagerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(null);
  const [allWorkouts, setAllWorkouts] = useState([
    {
      id: "1",
      name: "Curl Bíceps + Martillo",
      sets: [
        { weight: 15, reps: 12 },
        { weight: 17.5, reps: 10 },
        { weight: 20, reps: 8 },
      ],
      date: "2025-10-19 15:32:00",
    },
    {
      id: "2",
      name: "Remo con Barra",
      sets: [
        { weight: 40, reps: 10 },
        { weight: 45, reps: 8 },
        { weight: 50, reps: 6 },
      ],
      date: "2025-10-18 15:32:00",
    },
    {
      id: "3",
      name: "Remo con Barra",
      sets: [
        { weight: 40, reps: 10 },
        { weight: 45, reps: 8 },
        { weight: 50, reps: 6 },
      ],
      date: "2025-10-17 15:32:00",
    },
    {
      id: "4",
      name: "Press Banca",
      sets: [
        { weight: 60, reps: 10 },
        { weight: 65, reps: 8 },
        { weight: 70, reps: 6 },
      ],
      date: "2025-10-16 15:32:00",
    },
    {
      id: "5",
      name: "Sentadillas",
      sets: [
        { weight: 80, reps: 12 },
        { weight: 90, reps: 10 },
        { weight: 100, reps: 8 },
      ],
      date: "2025-10-15 15:32:00",
    },
    {
      id: "6",
      name: "Press Militar",
      sets: [
        { weight: 40, reps: 12 },
        { weight: 45, reps: 10 },
        { weight: 50, reps: 8 },
      ],
      date: "2025-10-14 15:32:00",
    },
    {
      id: "7",
      name: "Peso Muerto",
      sets: [
        { weight: 100, reps: 10 },
        { weight: 110, reps: 8 },
        { weight: 120, reps: 6 },
      ],
      date: "2025-10-13 15:32:00",
    },
    {
      id: "8",
      name: "Dominadas",
      sets: [
        { weight: 0, reps: 10 },
        { weight: 5, reps: 8 },
        { weight: 10, reps: 6 },
      ],
      date: "2025-10-12 15:32:00",
    },
    {
      id: "9",
      name: "Fondos en Paralelas",
      sets: [
        { weight: 0, reps: 12 },
        { weight: 5, reps: 10 },
        { weight: 10, reps: 8 },
      ],
      date: "2025-10-11 15:32:00",
    },
    {
      id: "10",
      name: "Curl Bíceps",
      sets: [
        { weight: 12, reps: 12 },
        { weight: 14, reps: 10 },
        { weight: 16, reps: 8 },
      ],
      date: "2025-10-10 15:32:00",
    },
    {
      id: "11",
      name: "Remo con Mancuerna",
      sets: [
        { weight: 30, reps: 10 },
        { weight: 32.5, reps: 8 },
        { weight: 35, reps: 6 },
      ],
      date: "2025-10-09 15:32:00",
    },
    {
      id: "12",
      name: "Press Inclinado",
      sets: [
        { weight: 50, reps: 12 },
        { weight: 55, reps: 10 },
        { weight: 60, reps: 8 },
      ],
      date: "2025-10-08 15:32:00",
    },
    {
      id: "13",
      name: "Extensión de Tríceps",
      sets: [
        { weight: 25, reps: 12 },
        { weight: 30, reps: 10 },
        { weight: 35, reps: 8 },
      ],
      date: "2025-10-07 15:32:00",
    },
    {
      id: "14",
      name: "Curl Martillo",
      sets: [
        { weight: 15, reps: 12 },
        { weight: 17.5, reps: 10 },
        { weight: 20, reps: 8 },
      ],
      date: "2025-10-06 15:32:00",
    },
    {
      id: "15",
      name: "Prensa de Piernas",
      sets: [
        { weight: 180, reps: 12 },
        { weight: 200, reps: 10 },
        { weight: 220, reps: 8 },
      ],
      date: "2025-10-05 15:32:00",
    },
    {
      id: "16",
      name: "Peso Muerto Rumano",
      sets: [
        { weight: 80, reps: 10 },
        { weight: 90, reps: 8 },
        { weight: 100, reps: 6 },
      ],
      date: "2025-10-04 15:32:00",
    },
    {
      id: "17",
      name: "Zancadas",
      sets: [
        { weight: 30, reps: 12 },
        { weight: 35, reps: 10 },
        { weight: 40, reps: 8 },
      ],
      date: "2025-10-03 15:32:00",
    },
    {
      id: "18",
      name: "Abdominales",
      sets: [
        { weight: 0, reps: 20 },
        { weight: 5, reps: 15 },
        { weight: 10, reps: 12 },
      ],
      date: "2025-10-02 15:32:00",
    },
    {
      id: "19",
      name: "Press Francés",
      sets: [
        { weight: 25, reps: 12 },
        { weight: 30, reps: 10 },
        { weight: 35, reps: 8 },
      ],
      date: "2025-10-01 15:32:00",
    },
    {
      id: "20",
      name: "Elevaciones Laterales",
      sets: [
        { weight: 10, reps: 12 },
        { weight: 12.5, reps: 10 },
        { weight: 15, reps: 8 },
      ],
      date: "2025-09-30 15:32:00",
    },
    {
      id: "21",
      name: "Curl Bíceps + Martillo",
      sets: [
        { weight: 15, reps: 12 },
        { weight: 17.5, reps: 10 },
        { weight: 20, reps: 8 },
      ],
      date: "2025-09-29 15:32:00",
    },
    {
      id: "22",
      name: "Remo con Barra",
      sets: [
        { weight: 40, reps: 10 },
        { weight: 45, reps: 8 },
        { weight: 50, reps: 6 },
      ],
      date: "2025-09-28 15:32:00",
    },
    {
      id: "23",
      name: "Press Banca",
      sets: [
        { weight: 60, reps: 10 },
        { weight: 65, reps: 8 },
        { weight: 70, reps: 6 },
      ],
      date: "2025-09-27 15:32:00",
    },
    {
      id: "24",
      name: "Press Militar",
      sets: [
        { weight: 40, reps: 12 },
        { weight: 45, reps: 10 },
        { weight: 50, reps: 8 },
      ],
      date: "2025-09-26 15:32:00",
    },
    {
      id: "26",
      name: "Remo con Barra",
      sets: [
        { weight: 40, reps: 10 },
        { weight: 45, reps: 8 },
        { weight: 50, reps: 6 },
      ],
      date: "2025-10-21 15:32:00",
    },
    {
      id: "27",
      name: "Press Banca",
      sets: [
        { weight: 60, reps: 10 },
        { weight: 65, reps: 8 },
        { weight: 70, reps: 6 },
      ],
      date: "2025-10-22 15:32:00",
    },
    {
      id: "28",
      name: "Sentadillas",
      sets: [
        { weight: 80, reps: 12 },
        { weight: 90, reps: 10 },
        { weight: 100, reps: 8 },
      ],
      date: "2025-10-23 15:32:00",
    },
  ]);
  const [days, setDays] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const generateDatesArray = (startDateStr) => {
    const start = new Date(startDateStr);
    const limit = new Date();
    limit.setDate(limit.getDate() + 7);
    const dates = [];

    const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const current = new Date(start);
    while (current <= limit) {
      const dateObj = new Date(current);
      const dia = dias[dateObj.getDay()];
      const mes = meses[dateObj.getMonth()];
      const num = dateObj.getDate();

      dates.push({
        comparable: dateObj,
        formatted: `${dia}, ${mes} ${num}`,
      });
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const minDate = allWorkouts.map((w) => new Date(w.date)).reduce((a, b) => (a < b ? a : b), new Date());
    const generatedDays = generateDatesArray(minDate);
    setDays(generatedDays);

    const todayIndex = generatedDays.findIndex((d) => d.comparable.toDateString() === new Date().toDateString());
    if (todayIndex !== -1) {
      setCurrentIndex(todayIndex);
      setCurrentDate(generatedDays[todayIndex]);
    }

    setIsReady(true);
  }, [allWorkouts]);

  const changeDate = (daysDelta) => {
    const newIndex = currentIndex + daysDelta;
    if (newIndex >= 0 && newIndex < days.length) {
      setCurrentIndex(newIndex);
      setCurrentDate(days[newIndex]);
      pagerRef.current?.setPage(newIndex);
    }
  };

  if (!isReady) {
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
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View
        style={{ position: "absolute", top: insets.top, left: 0, right: 0, zIndex: 10 }}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <Header date_navigator dateLabel={currentDate.formatted} changeDate={changeDate} />
      </View>

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={currentIndex}
        onPageSelected={(e) => {
          const newPos = e.nativeEvent.position;
          setCurrentIndex(newPos);
          setCurrentDate(days[newPos]);
        }}
      >
        {days.map((d, i) => {
          const dateStr = d.comparable.toISOString().split("T")[0];
          const filtered = allWorkouts.filter((w) => w.date.startsWith(dateStr));

          return (
            <View key={i} style={{ flex: 1 }}>
              {filtered.length === 0 ? (
                <ScrollView
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
                      <Text className="text-neutral-600 text-base font-medium tracking-wide">Workout Log Empty</Text>
                    </View>

                    <View className="w-full px-4 gap-3 mt-12">
                      <Link
                        asChild
                        href={{
                          pathname: "/CategoryList",
                          params: { date: dateStr },
                        }}
                      >
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
                <ScrollView
                  className="flex-1 px-4"
                  contentContainerStyle={{
                    paddingTop: headerHeight + 16,
                    paddingBottom: insets.bottom + 24,
                  }}
                >
                  {filtered.map((w) => (
                    <View key={w.id} className="mb-4 rounded-2xl bg-neutral-900 border border-neutral-800 p-4">
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
        })}
      </PagerView>
    </View>
  );
}
