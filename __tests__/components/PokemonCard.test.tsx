import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { PokemonCard } from '../../src/presentation/components/PokemonCard';
import { Pokemon } from '../../src/domain/entities/Pokemon';

describe('PokemonCard Component', () => {
  const mockPokemon: Pokemon = {
    id: '25',
    name: 'pikachu',
    imageUrl: 'https://ejemplo.com/pikachu.png',
  };

  it('Debe renderizar el nombre del Pokémon con la primera letra mayúscula y su ID', () => {
    const mockOnPress = jest.fn();
    let tree: renderer.ReactTestRenderer | undefined;

    act(() => {
      tree = renderer.create(
        <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />,
      );
    });

    const root = tree!.root;
    const textComponents = root.findAllByType(Text);
    const renderedTexts = textComponents.map(node => node.props.children);

    expect(renderedTexts[0].join('')).toBe('#025');
    expect(renderedTexts[1]).toBe('Pikachu');
  });

  it('Debe ejecutar la función onPress al tocar la tarjeta', () => {
    const mockOnPress = jest.fn();
    let tree: renderer.ReactTestRenderer | undefined;

    act(() => {
      tree = renderer.create(
        <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />,
      );
    });

    const root = tree!.root;
    const touchable = root.findByType(TouchableOpacity);

    act(() => {
      touchable.props.onPress();
    });

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
