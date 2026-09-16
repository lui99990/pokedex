import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { usePokemons } from '../hooks/usePokemons';
import { PokemonCard } from '../components/PokemonCard';
import { useNavigation } from '../navigation/NavigationContext';
import { HomeHeader } from '../components/HomeHeader';

export const HomeScreen = () => {
  const { pokemons, isLoading, error, isFetchingMore, loadMore } =
    usePokemons();
  const { navigate } = useNavigation();

  const onEndReachedCalledDuringMomentum = useRef(true);

  if (isLoading && pokemons.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <HomeHeader />
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>Cargando Pokédex...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <HomeHeader />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader />

      <FlatList
        data={pokemons}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              navigate({
                name: 'Detail',
                params: { pokemonId: item.id, pokemonName: item.name },
              })
            }
          />
        )}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current && !isFetchingMore) {
            loadMore();
            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color="#E3350D"
            />
          ) : (
            <View />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 50,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 15,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  footerLoader: {
    marginVertical: 20,
  },
});
