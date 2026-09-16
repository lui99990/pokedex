import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pokemon } from '../../domain/entities/Pokemon';

interface Props {
  pokemon: Pokemon;
  onPress: () => void;
}

export const PokemonCard = ({ pokemon, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.idText}>#{pokemon.id.padStart(3, '0')}</Text>
      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.nameText}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 8,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  idText: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
