import { Test } from '@nestjs/testing';
import { ConfigService } from 'core/config';
import { jestEnvSetup } from '../../../test/init';
import { RedisService } from './redis.service';

describe('redisService 테스트', () => {
  let redisService: RedisService;
  jestEnvSetup();
  const env = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };
    const moduleRef = await Test.createTestingModule({
      providers: [RedisService, ConfigService],
    }).compile();

    redisService = moduleRef.get<RedisService>(RedisService);
  });

  afterAll(() => {
    process.env = env;
  });

  it('redisService 서비스 호출 ', () => {
    expect(redisService).toBeDefined();
  });

  describe('redisService 함수 호출', () => {
    it('createRedisOptions -> ', async () => {
      const result = {
        host: 'localhost',
        password: '0000',
        port: 6379,
      };

      expect(await redisService.createRedisOptions()).toStrictEqual({
        config: {
          ...result,
        },
      });
    });
  });
});
