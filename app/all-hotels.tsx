import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HotelCard } from "../components/ui/HotelCard";
import { COLORS, HOTELS } from "../constants/data";

export default function AllHotelsScreen() {
  const animations = useRef(HOTELS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animatedSequence = animations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 120,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(120, animatedSequence).start();
  }, []);

  const handleHotelPress = (hotel: any): void => {
    console.log("Selected hotel:", hotel);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {HOTELS.map((hotel, index) => {
          const translateY = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [40, 0],
          });

          const opacity = animations[index];

          return (
            <Animated.View
              key={hotel.id}
              style={{
                opacity,
                transform: [{ translateY }],
                marginBottom: 16,
              }}
            >
              <HotelCard
                hotel={hotel}
                onPress={() => handleHotelPress(hotel)}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
