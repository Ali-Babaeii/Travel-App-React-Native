import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DestinationCard } from "../components/ui/DestinationCard";
import { COLORS, DESTINATIONS } from "../constants/data";
import { Destination } from "../types";

export default function AllDestinationsScreen() {
  const animations = useRef(
    DESTINATIONS.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animatedSequence = animations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 120, // stagger effect
        useNativeDriver: true,
      }),
    );

    Animated.stagger(120, animatedSequence).start();
  }, []);

  const handleDestinationPress = (destination: Destination): void => {
    console.log("Selected destination:", destination);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.grid}>
          {DESTINATIONS.map((destination: Destination, index: number) => {
            const translateY = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            });

            const opacity = animations[index];

            return (
              <Animated.View
                key={destination.id}
                style={[
                  styles.cardWrapper,
                  {
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                <DestinationCard
                  destination={destination}
                  onPress={() => handleDestinationPress(destination)}
                  isGrid
                />
              </Animated.View>
            );
          })}
        </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
});
