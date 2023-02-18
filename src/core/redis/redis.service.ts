import {
  RedisModuleOptions, RedisOptionsFactory
} from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'core';

@Injectable()
export class RedisService implements RedisOptionsFactory {
  constructor(private configService: ConfigService) { }

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.getRedisConfig().redisHost,
        port: this.configService.getRedisConfig().redisPort,
        password: this.configService.getRedisConfig().redisPassword,
      },
    };
  }
}
