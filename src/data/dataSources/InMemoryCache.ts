export class InMemoryCache {
  private static instance: InMemoryCache;
  private cache: Map<string, any>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): InMemoryCache {
    if (!InMemoryCache.instance) {
      InMemoryCache.instance = new InMemoryCache();
    }
    return InMemoryCache.instance;
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  get<T>(key: string): T | null {
    return this.cache.has(key) ? (this.cache.get(key) as T) : null;
  }
}
