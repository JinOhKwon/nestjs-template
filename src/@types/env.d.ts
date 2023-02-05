
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PORT: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_EXPIRATION_TIME: string;
    readonly IS_DOCKER_ENV: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_TTL: string;
    readonly DB_TYPE: string;
    readonly DB_HOST: string;
    readonly DB_HOST_DOCKER: string;
    readonly DB_PORT: string;
    readonly DB_USERNAME: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly KAKAO_KEY: string;
    readonly KAKAO_REDIRECT_URL: string;
    readonly NAVER_CLIENT_ID: string;
    readonly NAVER_CLIENT_SECRET: string;
    readonly NAVER_CALLBACK_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_SECERT_KEY: string;
    readonly GOOGLE_REDIRECT_URL: string;
    readonly AWS_USER_POOL_ID: string;
    readonly AWS_CLIENT_ID: string;
  }
}
