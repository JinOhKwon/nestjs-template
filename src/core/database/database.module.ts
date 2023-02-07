import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';

/**
 * 공유 모듈
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
