import { Global, Module } from '@nestjs/common';
import { PrismaLogger } from './prisma-logger.service';
import { PrismaService } from './prisma.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [PrismaService, PrismaLogger],
  exports: [PrismaService],
})
export class DatabaseModule {}
