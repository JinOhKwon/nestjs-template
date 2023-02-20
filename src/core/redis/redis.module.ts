import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
