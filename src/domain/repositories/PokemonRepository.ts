import { Pokemon, PokemonDetail } from '../entities/Pokemon';

export interface PokemonRepository {
  getPokemons(offset: number, limit: number): Promise<Pokemon[]>;
  getPokemonDetail(idOrName: string): Promise<PokemonDetail>;
}
