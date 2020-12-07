import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async set(key: string, value: any, ttl: number): Promise<any> {
    return this.cache.set(key, value, ttl);
  }
}
