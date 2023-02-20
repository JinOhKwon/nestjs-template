import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { CONFIG_KEY } from '.';

export interface IProcessEnv {
  nodeEnv: string;
  port: number;
  jwtSecretKey: string;
  jwtExpirationTime: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  databaseUrl: string;
  googleClientId: string;
  googleSecertKey: string;
  googleRedirectUrl: string;
  redisTtl: number;
  redisHost: string;
  redisPort: number;
  redisPassword: string;
}

/**
 * 환경 서비스
 */
@Injectable()
export class ConfigService {
  /**
   * 생성자
   */
  constructor() {
    // 프로세스 체크
    // console.log(process.env);
  }

  /**
   * 환경정보를 반환한다.
   *
   * @param key 키
   * @returns {string}
   */
  get(key: string): string | null {
    return env[key];
  }

  /**
   * 숫자로 반환한다.
   *
   * @param key 키
   * @returns {number}
   */
  getNumber(key: string): number {
    return Number(this.get(key));
  }

  /**
   * config를 반환한다.
   */
  getConfig(): Omit<IProcessEnv, 'redisTtl' | 'redisHost' | 'redisPort' | 'redisPassword'> {
    return {
      nodeEnv: this.get(CONFIG_KEY.COMMON.NODE_ENV),
      port: this.getNumber(CONFIG_KEY.COMMON.PORT),
      jwtSecretKey: this.get(CONFIG_KEY.OAUTH.JWT_SECRET_KEY),
      jwtExpirationTime: this.get(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
      awsAccessKeyId: this.get(CONFIG_KEY.AWS.AWS_ACCESS_KEY_ID),
      awsSecretAccessKey: this.get(CONFIG_KEY.AWS.AWS_SECRET_ACCESS_KEY),
      databaseUrl: this.get(CONFIG_KEY.DATABASE.DATABASE_URL),
      googleClientId: this.get(CONFIG_KEY.OAUTH.GOOGLE_CLIENT_ID),
      googleSecertKey: this.get(CONFIG_KEY.OAUTH.GOOGLE_SECERT_KEY),
      googleRedirectUrl: this.get(CONFIG_KEY.OAUTH.GOOGLE_REDIRECT_URL),
    };
  }

  /**
   * redis config를 설정하여 반환한다.
   */
  getRedisConfig(): RedisClientOptions {
    return {
      host: this.get(CONFIG_KEY.DATABASE.REDIS_HOST),
      port: this.getNumber(CONFIG_KEY.DATABASE.REDIS_PORT),
      password: this.get(CONFIG_KEY.DATABASE.REDIS_PASSWORD),
    };
  }
}
