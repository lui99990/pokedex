import { PokemonMapper } from '../src/data/models/PokemonMapper';
import { PokeApiListItem } from '../src/domain/entities/PokeApiModels';
+describe('PokemonMapper', () => {
  it('Debe convertir correctamente un item de la API a nuestra entidad Pokemon', () => {
    const mockApiData: PokeApiListItem = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };

    const result = PokemonMapper.toEntity(mockApiData);

    expect(result.id).toBe('1');
    expect(result.name).toBe('bulbasaur');
    expect(result.imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    );
  });
});
