import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
