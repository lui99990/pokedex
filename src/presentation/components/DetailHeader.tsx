import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

interface Props {
  pokemonName: string;
  onBack: () => void;
}

export const DetailHeader = ({ pokemonName, onBack }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={styles.backButtonText}>{'< Volver'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 10 : 55,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
});
