declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'relaese' | 'local';
    readonly PORT: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_EXPIRATION_TIME: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_TTL: string;
    readonly DATABASE_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_SECERT_KEY: string;
    readonly AWS_ACCESS_KEY_ID: string;
    readonly AWS_SECRET_ACCESS_KEY: string;
    readonly GOOGLE_REDIRECT_URL: string;
  }
}
