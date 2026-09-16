import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator, FlatList } from 'react-native';
import { HomeScreen } from '../../src/presentation/screens/HomeScreen';
import { usePokemons } from '../../src/presentation/hooks/usePokemons';
import { useNavigation } from '../../src/presentation/navigation/NavigationContext';

jest.mock('../../src/presentation/hooks/usePokemons', () => ({
  usePokemons: jest.fn(),
}));

jest.mock('../../src/presentation/navigation/NavigationContext', () => ({
  useNavigation: jest.fn(),
}));

describe('HomeScreen Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Debe mostrar el ActivityIndicator cuando está cargando inicialmente', () => {
    (usePokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      isLoading: true,
      error: null,
      isFetchingMore: false,
      loadMore: jest.fn(),
    });

    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });

    expect(tree!.root.findByType(ActivityIndicator)).toBeTruthy();
  });

  it('Debe mostrar un mensaje de error si la API falla', () => {
    (usePokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      isLoading: false,
      error: 'Error de red',
      isFetchingMore: false,
      loadMore: jest.fn(),
    });

    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });

    expect(tree!.root.findByProps({ children: 'Error de red' })).toBeTruthy();
  });

  it('Debe renderizar el FlatList con los Pokémon', () => {
    (usePokemons as jest.Mock).mockReturnValue({
      pokemons: [{ id: '1', name: 'bulbasaur', imageUrl: 'url1' }],
      isLoading: false,
      error: null,
      isFetchingMore: false,
      loadMore: jest.fn(),
    });

    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(<HomeScreen />);
    });

    const flatList = tree!.root.findByType(FlatList);
    expect(flatList.props.data.length).toBe(1);
  });
});
