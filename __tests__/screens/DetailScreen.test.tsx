import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Animated, ActivityIndicator } from 'react-native';
import { DetailScreen } from '../../src/presentation/screens/DetailScreen';

jest.mock('../../src/presentation/hooks/usePokemonDetail', () => ({
  usePokemonDetail: jest.fn(),
}));
jest.mock('../../src/presentation/hooks/useDetailAnimations', () => ({
  useDetailAnimations: jest.fn(),
}));
jest.mock('../../src/presentation/navigation/NavigationContext', () => ({
  useNavigation: jest.fn(),
}));

import { usePokemonDetail } from '../../src/presentation/hooks/usePokemonDetail';
import { useDetailAnimations } from '../../src/presentation/hooks/useDetailAnimations';
import { useNavigation } from '../../src/presentation/navigation/NavigationContext';
import { PokemonMeasurements } from '../../src/presentation/components/PokemonMeasurements';

describe('DetailScreen Component', () => {
  const mockGoBack = jest.fn();
  const mockRoute = {
    name: 'Detail' as const,
    params: { pokemonId: '25', pokemonName: 'pikachu' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });
    (useDetailAnimations as jest.Mock).mockReturnValue({
      screenTranslateX: new Animated.Value(0),
      imageScale: new Animated.Value(1),
      imageOpacity: new Animated.Value(1),
      cardTranslateY: new Animated.Value(0),
      animateExitAndGoBack: mockGoBack,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Debe mostrar el ActivityIndicator mientras carga el detalle', () => {
    (usePokemonDetail as jest.Mock).mockReturnValue({
      pokemon: null,
      isLoading: true,
      error: null,
    });

    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(<DetailScreen route={mockRoute} />);
    });

    expect(tree!.root.findByType(ActivityIndicator)).toBeTruthy();
  });

  it('Debe mostrar los datos del Pokémon correctamente al cargar', () => {
    const mockPokemonDetail = {
      id: '25',
      name: 'pikachu',
      imageUrl: 'url_pikachu',
      types: ['electric'],
      weight: 60,
      height: 4,
      stats: [],
    };

    (usePokemonDetail as jest.Mock).mockReturnValue({
      pokemon: mockPokemonDetail,
      isLoading: false,
      error: null,
    });

    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(<DetailScreen route={mockRoute} />);
    });

    const typeText = tree!.root.findByProps({ children: 'ELECTRIC' });
    expect(typeText).toBeTruthy();

    const measurementsComponent = tree!.root.findByType(PokemonMeasurements);
    expect(measurementsComponent.props.weight).toBe(60);
  });
});
