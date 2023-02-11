import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { LoggerService } from 'core/logger';
import { DatabaseLogger } from './database-logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private loggerService: LoggerService, private databaseLogger: DatabaseLogger) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    this.$on('query' as any, (event) => {
      this.databaseLogger.log(event as Prisma.QueryEvent)
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
