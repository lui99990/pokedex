import { PokemonRepository } from '../repositories/PokemonRepository';
import { Pokemon } from '../entities/Pokemon';

export class GetPokemonsUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute(offset: number = 0, limit: number = 20): Promise<Pokemon[]> {
    return this.pokemonRepository.getPokemons(offset, limit);
  }
}
