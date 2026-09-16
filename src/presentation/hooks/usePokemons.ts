import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../../domain/entities/Pokemon';
import { DIContainer } from '../../core/utils/DependencyInjector';

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [offset, setOffset] = useState<number>(0);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const limit = 20;

  const fetchPokemons = useCallback(
    async (currentOffset: number, isLoadMore: boolean = false) => {
      try {
        if (!isLoadMore) setIsLoading(true);
        else setIsFetchingMore(true);
        setError(null);

        const newPokemons = await DIContainer.getPokemonsUseCase.execute(
          currentOffset,
          limit,
        );

        setPokemons(prev =>
          isLoadMore ? [...prev, ...newPokemons] : newPokemons,
        );
      } catch (err) {
        console.log(err);
        setError('Hubo un problema al cargar los Pokémon.');
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPokemons(0);
  }, [fetchPokemons]);

  const loadMore = () => {
    if (!isLoading && !isFetchingMore) {
      const nextOffset = offset + limit;
      setOffset(nextOffset);
      fetchPokemons(nextOffset, true);
    }
  };

  return { pokemons, isLoading, error, isFetchingMore, loadMore };
};
