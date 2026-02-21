import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/data";
import { DestinationCardProps } from "../../types";

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onPress,
  isGrid = false,
}) => {
  const cardWidth: number | string = isGrid ? "100%" : 200;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
    >
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>From ${destination.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 240,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    padding: 16,
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  priceTag: {
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
