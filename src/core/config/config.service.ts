import { CacheModuleOptions } from '@nestjs/common';
import { CONFIG_KEY } from 'common/constants/config.enum';
/**
 * 환경 서비스
 */
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
  public get(key: string): string {
    return process.env[key];
  }

  /**
   * 숫자로 반환한다.
   *
   * @param key 키
   * @returns {number}
   */
  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  /**
   * config를 반환한다.
   */
  get config() {
    return {
      nodeEnv: this.get(CONFIG_KEY.COMMON.NODE_ENV) ?? 'development',
      port: this.get(CONFIG_KEY.COMMON.PORT),
      JWT_SECRET_KEY: this.get(CONFIG_KEY.OAUTH.JWT_SECRET_KEY),
      JWT_EXPIRATION_TIME: this.get(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
      AWS_ACCESS_KEY_ID: this.get(CONFIG_KEY.AWS.AWS_ACCESS_KEY_ID),
      AWS_SECRET_ACCESS_KEY: this.get(CONFIG_KEY.AWS.AWS_SECRET_ACCESS_KEY),
      REDIS_HOST: this.get(CONFIG_KEY.DATABASE.REDIS_HOST),
      REDIS_PORT: this.get(CONFIG_KEY.DATABASE.REDIS_PORT),
      REDIS_TTL: this.get(CONFIG_KEY.DATABASE.REDIS_TTL),
      DATABASE_URL: this.get(CONFIG_KEY.DATABASE.DATABASE_URL),
      GOOGLE_CLIENT_ID: this.get(CONFIG_KEY.OAUTH.GOOGLE_CLIENT_ID),
      GOOGLE_SECERT_KEY: this.get(CONFIG_KEY.OAUTH.GOOGLE_SECERT_KEY),
      GOOGLE_REDIRECT_URL: this.get(CONFIG_KEY.OAUTH.GOOGLE_REDIRECT_URL),
    };
  }

  /**
   * redis config를 설정하여 반환한다.
   */
  get redisConfig(): CacheModuleOptions {
    return {
      ttl: this.getNumber(CONFIG_KEY.DATABASE.REDIS_TTL),
      host: this.get(CONFIG_KEY.DATABASE.REDIS_HOST),
      port: this.getNumber(CONFIG_KEY.DATABASE.REDIS_PORT),
    };
  }
}
