import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  async set(
    key: string,
    value: Record<string, unknown>,
    ttl?: number,
  ): Promise<any> {
    const options: CachingConfig = {
      ttl,
    };

    return this.cache.set(key, value, ttl && options);
  }
}
