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

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
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
      id: "25",
      name: "Curl Bíceps + Martillo",
      sets: [
        { weight: 15, reps: 12 },
        { weight: 17.5, reps: 10 },
        { weight: 20, reps: 8 },
      ],
      date: "2025-10-20 15:32:00",
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
  const [workouts, setWorkouts] = useState([]);
  const [days, setDays] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minDate = allWorkouts.map((w) => new Date(w.date)).reduce((a, b) => (a < b ? a : b), new Date());
    setDays(generarFechasDesde(minDate));
  }, [allWorkouts]);

  useEffect(() => {
    if (dates.length > 0) {
      const todayIndex = dates.findIndex((d) => d.toDateString() === new Date().toDateString());
      if (todayIndex !== -1) {
        setCurrentIndex(todayIndex);
        setCurrentDate(dates[todayIndex]);
        // fuerza el movimiento visual una vez montado el PagerView
        setTimeout(() => {
          pagerRef.current?.setPageWithoutAnimation(todayIndex);
        }, 0);
      }
    }
  }, [dates]);

  const changeDate = (daysDelta) => {
    const newIndex = currentIndex + daysDelta;
    if (newIndex >= 0 && newIndex < days.length) {
      setCurrentIndex(newIndex);
      setCurrentDate(days[newIndex]);
      pagerRef.current?.setPage(newIndex); // sincroniza visualmente el PageView
    }
  };

  const generarFechasDesde = (fechaInicioStr) => {
    const inicio = new Date(fechaInicioStr);
    const limite = new Date();
    limite.setDate(limite.getDate() + 7); // hasta 7 días después de hoy
    const fechas = [];

    const actual = new Date(inicio);
    while (actual <= limite) {
      fechas.push(new Date(actual));
      actual.setDate(actual.getDate() + 1);
    }
    setDates(fechas);
    return fechas;
  };
  // Obtener ejercicios solo para la fecha seleccionada
  useEffect(() => {
    const currentDateStr = currentDate.toISOString().split("T")[0];
    const filtered = allWorkouts.filter((w) => w.date.startsWith(currentDateStr));
    setWorkouts(filtered);
  }, [currentDate, allWorkouts]);
  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View
        style={{ position: "absolute", top: insets.top, left: 0, right: 0, zIndex: 10 }}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <Header date_navigator dateLabel={currentDate.toISOString().split("T")[0]} changeDate={changeDate} />
      </View>

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        // initialPage={currentIndex}
        onPageSelected={(e) => {
          console.log(e.nativeEvent.position);

          const newPos = e.nativeEvent.position;
          setCurrentIndex(newPos);
          setCurrentDate(days[newPos]);
        }}
      >
        {days.map((d, i) => {
          const dateStr = d.toISOString().split("T")[0];
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
