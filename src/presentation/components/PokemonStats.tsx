import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stat } from '../../domain/entities/Pokemon';

interface Props {
  stats: Stat[];
}

export const PokemonStats = ({ stats }: Props) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Estadísticas Base</Text>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <Text style={styles.statName}>{stat.name.toUpperCase()}</Text>
          <Text style={styles.statValue}>{stat.value}</Text>
          <View style={styles.statBarBackground}>
            <View
              style={[
                styles.statBarFill,
                { width: `${Math.min(stat.value, 100)}%` },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statName: {
    flex: 1,
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
  },
  statValue: {
    width: 35,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statBarBackground: {
    flex: 2,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});
