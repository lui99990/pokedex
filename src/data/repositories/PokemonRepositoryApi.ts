import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { Pokemon, PokemonDetail } from '../../domain/entities/Pokemon';
import { API_BASE_URL } from '../../core/config/api';
import { PokemonMapper } from '../models/PokemonMapper';
import { InMemoryCache } from '../dataSources/InMemoryCache';
import {
  PokeApiDetailResponse,
  PokeApiListResponse,
} from '../../domain/entities/PokeApiModels';

export class PokemonRepositoryImpl implements PokemonRepository {
  private cache = InMemoryCache.getInstance();

  async getPokemons(
    offset: number = 0,
    limit: number = 20,
  ): Promise<Pokemon[]> {
    const cacheKey = `pokemons_${offset}_${limit}`;
    const cachedData = this.cache.get<Pokemon[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );
      if (!response.ok) throw new Error('Error fetching pokemons');

      const data: PokeApiListResponse = await response.json();
      const pokemons = data.results.map(PokemonMapper.toEntity);

      this.cache.set(cacheKey, pokemons);
      return pokemons;
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo cargar la lista de Pokémon');
    }
  }

  async getPokemonDetail(idOrName: string): Promise<PokemonDetail> {
    const cacheKey = `pokemon_detail_${idOrName}`;
    const cachedData = this.cache.get<PokemonDetail>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
      if (!response.ok) throw new Error('Error fetching pokemon details');

      const data: PokeApiDetailResponse = await response.json();
      const pokemonDetail = PokemonMapper.toDetailEntity(data);

      this.cache.set(cacheKey, pokemonDetail);
      return pokemonDetail;
    } catch (error) {
      console.error(error);
      throw new Error('No se pudieron cargar los detalles del Pokémon');
    }
  }
}
