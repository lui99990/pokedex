import { GetPokemonsUseCase } from '../../domain/useCases/GetPokemonsUseCase';
import { GetPokemonDetailUseCase } from '../../domain/useCases/GetPokemonDetailUseCase';
import { PokemonRepositoryImpl } from '../../data/repositories/PokemonRepositoryApi';

const pokemonRepository = new PokemonRepositoryImpl();

export const DIContainer = {
  getPokemonsUseCase: new GetPokemonsUseCase(pokemonRepository),
  getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
};
