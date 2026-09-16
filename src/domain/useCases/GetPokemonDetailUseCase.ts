import { PokemonRepository } from '../repositories/PokemonRepository';
import { PokemonDetail } from '../entities/Pokemon';

export class GetPokemonDetailUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute(idOrName: string): Promise<PokemonDetail> {
    return this.pokemonRepository.getPokemonDetail(idOrName);
  }
}
