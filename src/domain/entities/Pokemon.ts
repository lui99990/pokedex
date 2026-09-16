export interface Pokemon {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PokemonDetail extends Pokemon {
  types: string[];
  weight: number;
  height: number;
  stats: Stat[];
}

export interface Stat {
  name: string;
  value: number;
}
