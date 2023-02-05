import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
