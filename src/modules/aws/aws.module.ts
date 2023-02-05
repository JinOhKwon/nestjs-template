import { Global, Module } from '@nestjs/common';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [],
  exports: [],
})
export class AwsModule {}
