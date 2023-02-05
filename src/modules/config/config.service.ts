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
   * 환경정보를 반환한다.
   */
  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get isProduction(): boolean {
    return this.get(CONFIG_KEY.COMMON.NODE_ENV) === 'production';
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

  /**
   * ORM config를 설정하여 반환한다.
   */
  get mikrOrmConfig(): any {
    return {};
    // return {
    //   entities: ['dist/**/*.entity.js'],
    //   entitiesTs: ['src/**/*.entity.ts'],
    //   debug: true,
    //   type: 'mysql',
    //   loggerFactory: (options: LoggerOptions) => new DatabaseLogger(options),
    //   highlighter: new SqlHighlighter(),
    //   host: 'localhost',
    //   port: this.getNumber(CONFIG_KEY.DATABASE.DB_MASTER_PORT) || 3306,
    //   user: this.get(CONFIG_KEY.DATABASE.DB_USERNAME),
    //   password: this.get(CONFIG_KEY.DATABASE.DB_PASSWORD),
    //   forceUndefined: true,
    //   dbName: 'gcnyy',
    //   timezone: '+09:00',
    //   loadStrategy: LoadStrategy.JOINED,
    //   migrations: {
    //     path: 'dist/migrations',
    //     pathTs: 'src/migrations',
    //   },
    // };
  }
}
