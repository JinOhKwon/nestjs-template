import { Global, Module } from '@nestjs/common';
import { PrismaLogger } from './service/prisma-logger.service';
import { PrismaService } from './service/prisma.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [PrismaService, PrismaLogger],
  exports: [PrismaService],
})
export class DatabaseModule {}
