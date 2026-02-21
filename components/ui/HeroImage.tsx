import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, HERO_IMAGE } from '../../constants/data';

const { width } = Dimensions.get('window');

export const HeroImage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: HERO_IMAGE }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Explore the World</Text>
        <Text style={styles.subtitle}>Book your dream vacation today</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    position: 'relative',
  },
  image: {
    width,
    height: 320,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
