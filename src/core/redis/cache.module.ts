import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'core';
import { CacheService } from './cache.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  imports: [RedisModule.forRootAsync(
    {

      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        return {
          config: {
            ...configService.getRedisConfig()
          },
        };
      }
    }
  )],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {
  constructor(private cacheService: CacheService) { }

  async onModuleDestroy() {
    await this.cacheService.onModuleDestroy();
  }
}
