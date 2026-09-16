import { InMemoryCache } from '../src/data/dataSources/InMemoryCache';

describe('InMemoryCache (Singleton)', () => {
  it('Debe guardar y recuperar datos correctamente', () => {
    const cache = InMemoryCache.getInstance();
    const testKey = 'test_pokemon';
    const testData = { name: 'Pikachu', type: 'Electric' };

    cache.set(testKey, testData);
    const retrievedData = cache.get<{ name: string; type: string }>(testKey);

    expect(retrievedData).not.toBeNull();
    expect(retrievedData?.name).toBe('Pikachu');
  });
});
