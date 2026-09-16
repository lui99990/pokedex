export type Route =
  | { name: 'Home' }
  | { name: 'Detail'; params: { pokemonId: string; pokemonName: string } };

export interface NavigationContextProps {
  currentRoute: Route;
  navigate: (route: Route) => void;
  goBack: () => void;
}
