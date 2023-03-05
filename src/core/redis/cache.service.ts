import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }
  async onModuleDestroy() {
    await this.redisClient.disconnect();
  }

  async get(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<'OK'> {
    return await this.redisClient.set(key, value, 'EX', expire ?? 10);
  }

  async delete(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
}
