import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from 'core/config';
import { jestEnvSetup } from '../../../test/init';
import { CacheService } from './cache.service';

describe('cacheService 테스트', () => {
  jestEnvSetup();
  const env = process.env;
  let cacheService: CacheService;

  beforeEach(async () => {
    process.env = { ...env };
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule.forRootAsync(
        {
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
            console.log(configService.getRedisConfig());
            return {
              config: {
                ...configService.getRedisConfig()
              },
            };
          }
        }
      )],
      providers: [CacheService],
    }).compile();

    cacheService = moduleRef.get<CacheService>(CacheService);
  });

  afterAll(async () => {
    process.env = env;
    await cacheService.delete('test');
  });

  it('cacheService 서비스 호출 ', () => {
    expect(cacheService).toBeDefined();
  });

  describe('cacheService 함수 호출', () => {
    it('set() ->', async () => {
      const result = await cacheService.set('test', 'test', 100);
      expect(result).toBe('OK');
    });

    it('set() ->', async () => {
      const result = await cacheService.set('test', 'test', undefined);
      expect(result).toBe('OK');
    });

    it('get() ->', async () => {
      await cacheService.set('test', 'test', 100);
      const result = await cacheService.get('test');
      expect(result).toBe('test');
    });

    it('delete() ->', async () => {
      await cacheService.delete('test');
      const result = await cacheService.get('test');
      expect(result).toBe(null);
    });
  });
});
