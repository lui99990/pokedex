import { useState, useEffect } from 'react';
import { PokemonDetail } from '../../domain/entities/Pokemon';
import { DIContainer } from '../../core/utils/DependencyInjector';

export const usePokemonDetail = (pokemonId: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await DIContainer.getPokemonDetailUseCase.execute(
          pokemonId,
        );
        if (isMounted) setPokemon(data);
      } catch {
        if (isMounted) setError('No se pudo cargar el detalle del Pokémon.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  return { pokemon, isLoading, error };
};
