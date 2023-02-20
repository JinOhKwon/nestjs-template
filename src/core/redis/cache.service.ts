import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService implements OnModuleDestroy {
  private readonly redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  onModuleDestroy() {
    this.redisClient.quit();
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<'OK'> {
    return this.redisClient.set(key, value, 'EX', expire ?? 10);
  }

  async delete(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}
