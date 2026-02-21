import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/data";
import {
  FlightResult,
  FlightSearchParams,
  HotelResult,
  HotelSearchParams,
} from "../types";

export default function SearchResultsScreen() {
  const params = useLocalSearchParams<{ searchType: string; data: string }>();
  const { searchType, data } = params;

  const searchData: FlightSearchParams | HotelSearchParams = data
    ? JSON.parse(data)
    : {};

  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<FlightResult[] | HotelResult[]>([]);

  const headerAnimation = useRef(new Animated.Value(0)).current;
  const itemAnimations = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      const generated = generateMockResults(searchType);
      setResults(generated);

      // Prepare animation values
      generated.forEach((_, i) => {
        itemAnimations[i] = new Animated.Value(0);
      });

      setLoading(false);

      // Animate header
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Animate items staggered
      const animations = generated.map((_, index) =>
        Animated.timing(itemAnimations[index], {
          toValue: 1,
          duration: 500,
          delay: index * 120,
          useNativeDriver: true,
        }),
      );

      Animated.stagger(120, animations).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const generateMockResults = (
    type: string,
  ): FlightResult[] | HotelResult[] => {
    if (type === "flights") {
      return Array.from(
        { length: 10 },
        (_, i): FlightResult => ({
          id: i + 1,
          airline: [
            "Emirates",
            "Qatar Airways",
            "Turkish Airlines",
            "Lufthansa",
            "British Airways",
          ][i % 5],
          departureTime: `${8 + i}:00 AM`,
          arrivalTime: `${12 + i}:30 PM`,
          duration: `${4 + (i % 3)}h ${30 + (i % 4) * 10}m`,
          stops:
            i % 3 === 0
              ? "Direct"
              : `${(i % 2) + 1} stop${i % 2 === 0 ? "" : "s"}`,
          price: 250 + i * 50,
          class: "Economy",
        }),
      );
    } else {
      return Array.from(
        { length: 10 },
        (_, i): HotelResult => ({
          id: i + 1,
          name: `${["Grand", "Luxury", "Royal", "Premium", "Executive"][i % 5]
            } ${["Hotel", "Resort", "Suites", "Inn", "Plaza"][i % 5]}`,
          rating: (4.0 + (i % 10) * 0.1).toFixed(1),
          reviews: 500 + i * 100,
          amenities: ["WiFi", "Pool", "Spa", "Gym"][i % 4],
          distance: `${(0.5 + i * 0.3).toFixed(1)} km from center`,
          price: 80 + i * 20,
          perNight: true,
        }),
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingTitle}>
            Searching for the best {searchType}...
          </Text>
          <Text style={styles.loadingSubtitle}>
            We are finding the best prices for you
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const flightData = searchData as FlightSearchParams;
  const hotelData = searchData as HotelSearchParams;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: searchType === "flights" ? "Flight Results" : "Hotel Results",
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Animated Header */}
        <Animated.View
          style={[
            styles.resultsHeader,
            {
              opacity: headerAnimation,
              transform: [
                {
                  translateY: headerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.resultsCount}>
            {results.length} results found
          </Text>
          <Text style={styles.resultsSubtext}>
            {searchType === "flights"
              ? `${flightData.from} → ${flightData.to}`
              : `${hotelData.destination}`}
          </Text>
        </Animated.View>

        {/* Results */}
        {searchType === "flights"
          ? (results as FlightResult[]).map((flight, index) => (
            <Animated.View
              key={flight.id}
              style={[
                styles.resultCard,
                {
                  opacity: itemAnimations[index],
                  transform: [
                    {
                      translateY: itemAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.airlineName}>{flight.airline}</Text>
              <Text style={styles.priceAmount}>${flight.price}</Text>
              <Text style={styles.classText}>
                {flight.departureTime} → {flight.arrivalTime}
              </Text>
            </Animated.View>
          ))
          : (results as HotelResult[]).map((hotel, index) => (
            <Animated.View
              key={hotel.id}
              style={[
                styles.resultCard,
                {
                  opacity: itemAnimations[index],
                  transform: [
                    {
                      translateY: itemAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Text style={styles.priceAmount}>${hotel.price}/night</Text>
              <Text style={styles.reviewsText}>
                ⭐ {hotel.rating} ({hotel.reviews} reviews)
              </Text>
            </Animated.View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginTop: 15,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  content: { flex: 1, paddingHorizontal: 20 },
  resultsHeader: { paddingVertical: 20 },
  resultsCount: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  resultsSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 0.2,
    borderColor: COLORS.primary,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 6,
  },
  classText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
