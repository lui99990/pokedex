import {
  PokeApiDetailResponse,
  PokeApiListItem,
} from '../../domain/entities/PokeApiModels';
import { Pokemon, PokemonDetail } from '../../domain/entities/Pokemon';

export class PokemonMapper {
  static toEntity(item: PokeApiListItem): Pokemon {
    const urlParts = item.url.split('/');
    const id = urlParts[urlParts.length - 2];

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id,
      name: item.name,
      imageUrl,
    };
  }

  static toDetailEntity(data: PokeApiDetailResponse): PokemonDetail {
    return {
      id: data.id.toString(),
      name: data.name,
      imageUrl: data.sprites.other['official-artwork'].front_default,
      types: data.types.map(t => t.type.name),
      weight: data.weight,
      height: data.height,
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  }
}
