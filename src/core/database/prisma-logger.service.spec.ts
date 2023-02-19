import { Test } from '@nestjs/testing';
import { LoggerModule } from 'core/logger';
import { PrismaLogger } from './prisma-logger.service';

describe('prismaLoggerService', () => {
  let prismaLogger: PrismaLogger;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LoggerModule
      ],
      providers: [
        PrismaLogger,
      ],
    }).compile();

    prismaLogger = moduleRef.get<PrismaLogger>(PrismaLogger);
  });

  it('서비스 호출 prismaLoggerService', () => {
    expect(prismaLogger).toBeDefined();
  });

  describe('prismaLoggerService', () => {
    it('query -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'query');

      prismaLogger.query({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      })

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('info -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'info');

      prismaLogger.info({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      })

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('warn -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'warn');

      prismaLogger.warn({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      })

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('error -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'error');

      prismaLogger.error({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      })

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('setDebugMode -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'setDebugMode');
      prismaLogger.setDebugMode(false);
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });
  });
});
