import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  weight: number;
  height: number;
}

export const PokemonMeasurements = ({ weight, height }: Props) => {
  return (
    <View style={styles.measurementsContainer}>
      <View style={styles.measurementBox}>
        <Text style={styles.measurementValue}>{weight / 10} kg</Text>
        <Text style={styles.measurementLabel}>Peso</Text>
      </View>
      <View style={styles.measurementBox}>
        <Text style={styles.measurementValue}>{height / 10} m</Text>
        <Text style={styles.measurementLabel}>Altura</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  measurementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  measurementBox: {
    alignItems: 'center',
  },
  measurementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementLabel: {
    fontSize: 14,
    color: '#888',
  },
});
