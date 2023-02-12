import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { LoggerService } from 'core/logger';
import { PrismaLogger } from './prisma-logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private loggerService: LoggerService, private databaseLogger: PrismaLogger) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    this.$on('query' as any, (event: Prisma.QueryEvent | Prisma.LogEvent | (() => Promise<void>)) => {
      this.databaseLogger.query(event as Prisma.QueryEvent)
    });
    this.$on('info' as any, (event: Prisma.QueryEvent | Prisma.LogEvent | (() => Promise<void>)) => {
      this.databaseLogger.info(event as Prisma.QueryEvent)
    });
    this.$on('warn' as any, (event: Prisma.QueryEvent | Prisma.LogEvent | (() => Promise<void>)) => {
      this.databaseLogger.warn(event as Prisma.QueryEvent)
    });
    this.$on('error' as any, (event: Prisma.QueryEvent | Prisma.LogEvent | (() => Promise<void>)) => {
      this.databaseLogger.error(event as Prisma.QueryEvent)
    });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
