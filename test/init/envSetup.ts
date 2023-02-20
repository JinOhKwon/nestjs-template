import { env } from 'process';

/**
 * ENV file과 동일하게 반환한다.(.env)
 */
export const jestEnvSetup = (): void => {
  env.NODE_ENV = 'local';
  env.PORT = '3030';
  env.AWS_ACCESS_KEY_ID = 'xxxx';
  env.AWS_SECRET_ACCESS_KEY = 'xxxxx';
  env.JWT_SECRET_KEY = 'xxxx';
  env.JWT_EXPIRATION_TIME = 'xxxx';
  env.AWS_REGION = 'ap-northeast-2';
  env.REDIS_HOST = 'localhost';
  env.REDIS_PORT = '6379';
  env.REDIS_PASSWORD = '0000';
  env.REDIS_TTL = '55';
  env.DATABASE_URL = 'mysql://nestjs:0000@localhost:3306/nestjs';
  env.SHADOW_DATABASE_URL = 'mysql://nestjs:0000@localhost:3307/nestjs';
  env.GOOGLE_CLIENT_ID = 'xxx';
  env.GOOGLE_SECERT_KEY = 'xxx';
  env.GOOGLE_REDIRECT_URL = 'xxx';
};
