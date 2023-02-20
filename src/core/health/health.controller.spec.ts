import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';
import { LoggerModule } from 'core/logger';
import { HealthController } from './health.controller';

describe('healthController 테스트', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule, TerminusModule],
      controllers: [HealthController],
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
  });

  it('healthController 서비스 호출 ', () => {
    expect(healthController).toBeDefined();
  });

  describe('healthController 함수 호출', () => {
    it('check -> ', async () => {
      const result = {
        details: { 'memory RSS': { status: 'up' }, 'memory heap': { status: 'up' } },
        error: {},
        info: { 'memory RSS': { status: 'up' }, 'memory heap': { status: 'up' } },
        status: 'ok',
      };
      // object 비교는 toStrictEqual 사용
      expect(await healthController.check()).toStrictEqual(result);
    });

    it('memory check -> ', () => {
      // memory check app
      const formatMemoryUsage = (data) => `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

      const memoryData = process.memoryUsage();

      const memoryUsage = {
        rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
        heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
        heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
        external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
      };

      console.log(memoryUsage);
    });
  });
});
