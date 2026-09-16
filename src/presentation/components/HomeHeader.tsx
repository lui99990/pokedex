import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: 5,
  },
  logo: {
    width: 220,
    height: 80,
  },
});
