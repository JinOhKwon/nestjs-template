import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisService } from './redis.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  imports: [
    RedisModule
  ],
  providers: [RedisService, CacheService],
  exports: [CacheService],
})
export class RedisModule { }
