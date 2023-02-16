import { CacheModuleOptions, Injectable } from '@nestjs/common';
import { CONFIG_KEY } from 'core/config/constants/config';
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
  get(key: string): string {
    return process.env[key] ?? '';
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
  get config(): Record<keyof NodeJS.ProcessEnv, string | number> {
    return {
      nodeEnv: this.get(CONFIG_KEY.COMMON.NODE_ENV) ?? 'development',
      port: this.get(CONFIG_KEY.COMMON.PORT),
      jwtSecretKey: this.get(CONFIG_KEY.OAUTH.JWT_SECRET_KEY),
      jwtExpirationTime: this.get(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
      awsAccessKeyId: this.get(CONFIG_KEY.AWS.AWS_ACCESS_KEY_ID),
      awsSecretAccessKey: this.get(CONFIG_KEY.AWS.AWS_SECRET_ACCESS_KEY),
      redisHost: this.get(CONFIG_KEY.DATABASE.REDIS_HOST),
      redisPort: this.get(CONFIG_KEY.DATABASE.REDIS_PORT),
      redisTtl: this.get(CONFIG_KEY.DATABASE.REDIS_TTL),
      databaseUrl: this.get(CONFIG_KEY.DATABASE.DATABASE_URL),
      googleClientId: this.get(CONFIG_KEY.OAUTH.GOOGLE_CLIENT_ID),
      googleSecertKey: this.get(CONFIG_KEY.OAUTH.GOOGLE_SECERT_KEY),
      googleRedirectUrl: this.get(CONFIG_KEY.OAUTH.GOOGLE_REDIRECT_URL),
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
