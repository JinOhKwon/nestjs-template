import { Global, Module } from '@nestjs/common';
import { DatabaseLogger } from './service/database-logger.service';
import { PrismaService } from './service/prisma.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [PrismaService, DatabaseLogger],
  exports: [PrismaService],
})
export class DatabaseModule {}
