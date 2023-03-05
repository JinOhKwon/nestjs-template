import { Test } from '@nestjs/testing';
import { CONFIG_KEY } from '.';
import { jestEnvSetup } from '../../../test/init';
import { ConfigService } from './config.service';

describe('configService 테스트', () => {
  jestEnvSetup();
  const env = process.env;
  let configService: ConfigService;

  beforeEach(async () => {
    process.env = { ...env };
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    process.env = env;
  });

  it('configService 서비스 호출 ', () => {
    expect(configService).toBeDefined();
  });

  describe('configService 함수 호출', () => {
    it('get() -> ', () => {
      expect(configService.get(CONFIG_KEY.COMMON.NODE_ENV)).toEqual('local');
    });

    it('getNumber() -> ', () => {
      expect(configService.getNumber(CONFIG_KEY.COMMON.PORT)).toEqual(3030);
    });

    it('getConfig() -> ', () => {
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

    it('getRedisConfig() -> ', () => {
      expect(configService.getRedisConfig()).toStrictEqual({
        host: 'localhost',
        password: '0000',
        port: 6379,
      });
    });
  });
});
