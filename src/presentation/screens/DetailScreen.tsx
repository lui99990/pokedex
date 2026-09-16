import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import { Route } from '../navigation/NavigationTypes';
import { useNavigation } from '../navigation/NavigationContext';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { useDetailAnimations } from '../hooks/useDetailAnimations';

import { DetailHeader } from '../components/DetailHeader';
import { PokemonMeasurements } from '../components/PokemonMeasurements';
import { PokemonStats } from '../components/PokemonStats';

import { getColorByType } from '../theme/TypeColors';

export const DetailScreen = ({
  route,
}: {
  route: Route & { name: 'Detail' };
}) => {
  const { pokemonId, pokemonName } = route.params;
  const { goBack } = useNavigation();

  const { pokemon, isLoading, error } = usePokemonDetail(pokemonId);
  const {
    screenTranslateX,
    imageScale,
    imageOpacity,
    cardTranslateY,
    animateExitAndGoBack,
  } = useDetailAnimations(isLoading, !!pokemon, goBack);

  const backgroundColor =
    pokemon && pokemon.types.length > 0
      ? getColorByType(pokemon.types[0])
      : '#E3350D';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: screenTranslateX }],
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <DetailHeader pokemonName={pokemonName} onBack={animateExitAndGoBack} />

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E3350D" />
        </View>
      ) : error || !pokemon ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            {error || 'Pokemon no encontrado'}
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            style={[
              styles.imageContainer,
              { opacity: imageOpacity, transform: [{ scale: imageScale }] },
            ]}
          >
            <Animated.Image
              source={{ uri: pokemon.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.infoCard,
              { transform: [{ translateY: cardTranslateY }] },
            ]}
          >
            <View style={styles.typesContainer}>
              {pokemon.types.map((type, index) => (
                <View
                  key={index}
                  style={[
                    styles.typeBadge,
                    { backgroundColor: getColorByType(type) },
                  ]}
                >
                  <Text style={styles.typeText}>{type.toUpperCase()}</Text>
                </View>
              ))}
            </View>
            <PokemonMeasurements
              weight={pokemon.weight}
              height={pokemon.height}
            />
            <PokemonStats stats={pokemon.stats} />
          </Animated.View>
        </ScrollView>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  errorText: { fontSize: 16, color: 'red' },
  scrollContent: { paddingBottom: 30 },
  imageContainer: { alignItems: 'center', zIndex: 1, marginTop: 10 },
  image: { width: 200, height: 200 },
  infoCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
    marginTop: -40,
    minHeight: 500,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeText: { color: '#fff', fontWeight: 'bold' },
});
