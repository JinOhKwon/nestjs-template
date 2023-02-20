import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from 'core/config';
import { CacheService } from './cache.service';
import { RedisService } from './redis.service';

describe('cacheService 테스트', () => {
  let cacheService: CacheService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        RedisModule.forRootAsync({
          imports: [ConfigModule],
          useClass: RedisService,
          inject: [ConfigService],
        }),
      ],
      providers: [CacheService],
    }).compile();

    cacheService = moduleRef.get<CacheService>(CacheService);
  });

  afterAll(async () => {
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
