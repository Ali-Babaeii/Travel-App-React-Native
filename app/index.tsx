import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DestinationCard } from "../components/ui/DestinationCard";
import { HeroImage } from "../components/ui/HeroImage";
import { HotelCard } from "../components/ui/HotelCard";
import { SearchCard } from "../components/ui/SearchCard";
import { COLORS, DESTINATIONS, HOTELS } from "../constants/data";
import { Destination, Hotel } from "../types";

export default function HomeScreen() {
  const handleDestinationPress = (destination: Destination): void => {
    console.log("Selected destination:", destination);
  };

  const handleHotelPress = (hotel: Hotel): void => {
    console.log("Selected hotel:", hotel);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <HeroImage />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <SearchCard />

            {/* Popular Destinations */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Destinations</Text>
                <TouchableOpacity
                  onPress={() => router.push("/all-destinations")}
                >
                  <Text style={styles.seeAll}>See all →</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {DESTINATIONS.map((destination: Destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onPress={() => handleDestinationPress(destination)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Featured Hotels */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Hotels</Text>
                <TouchableOpacity onPress={() => router.push("/all-hotels")}>
                  <Text style={styles.seeAll}>See all →</Text>
                </TouchableOpacity>
              </View>
              {HOTELS.map((hotel: Hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onPress={() => handleHotelPress(hotel)}
                />
              ))}
            </View>

            <View style={{ height: 30 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
});
