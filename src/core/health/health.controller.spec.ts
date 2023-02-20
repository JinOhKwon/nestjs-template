import { INestApplication } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';
import { LoggerModule } from 'core/logger';
import { HealthController } from './health.controller';

describe('healthController 테스트', () => {
  let app: INestApplication;
  let healthController: HealthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule, TerminusModule],
      controllers: [HealthController],
    }).compile();

    app = moduleRef.createNestApplication();
    healthController = moduleRef.get<HealthController>(HealthController);
    app.init();
  });

  it('healthController 서비스 호출 ', () => {
    expect(healthController).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
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
  });
});
