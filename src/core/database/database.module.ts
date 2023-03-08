import { Global, Module } from '@nestjs/common';
import { LoggerService } from 'core/logger';
import { PrismaLogger } from './prisma-logger.service';
import { PrismaService } from './prisma.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [
    PrismaService,
    PrismaLogger,
    {
      provide: 'LoggerService',
      useClass: LoggerService,
    },
    {
      provide: 'DebugMode',
      // TODO node env
      useValue: false,
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
