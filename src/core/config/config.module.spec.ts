import { Test } from '@nestjs/testing';
import { CONFIG_KEY } from '.';
import { jestEnvSetup } from '../../../test/init';
import { ConfigService } from './config.service';

describe('ConfigModule', () => {
  jestEnvSetup();
  const env = process.env;
  let configService: ConfigService;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    process.env = env;
  });

  describe('ConfigService', () => {
    it('get() -> ', () => {
      expect(configService.get(CONFIG_KEY.COMMON.NODE_ENV)).toEqual('local');
    });

    it('getNumber() -> ', () => {
      expect(configService.getNumber(CONFIG_KEY.COMMON.PORT)).toEqual(3030);
    });

    it('getConfig -> ', () => {
      expect(configService.getConfig()).toStrictEqual({
        nodeEnv: 'local',
        port: 3030,
        jwtSecretKey: 'xxxx',
        jwtExpirationTime: 'xxxx',
        awsAccessKeyId: 'xxxx',
        awsSecretAccessKey: 'xxxxx',
        databaseUrl: 'mysql://nestjs:0000@localhost:3306/nestjs',
        googleClientId: 'xxx',
        googleSecertKey: 'xxx',
        googleRedirectUrl: 'xxx',
      });
    });

    it('getRedis -> ', () => {
      expect(configService.getRedisConfig()).toStrictEqual({
        redisHost: 'xxxx',
        redisPort: 5566,
        redisTtl: 55,
        redisPassword: 'xxx',
      });
    });
  });
});
