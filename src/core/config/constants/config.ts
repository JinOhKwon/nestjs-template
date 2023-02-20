enum COMMON {
  /**
   * 노드 환경 정보
   */
  NODE_ENV = 'NODE_ENV',
  /**
   * 포트
   */
  PORT = 'PORT',
}

enum DATABASE {
  /**
   * 레디스 호스트
   */
  REDIS_HOST = 'REDIS_HOST',
  /**
   * 레디스 포트
   */
  REDIS_PORT = 'REDIS_PORT',
  /**
   * redis password
   */
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  /**
   * 레디스 시간
   */
  REDIS_TTL = 'REDIS_TTL',
  /**
   * DB 데이터베이스
   */
  DATABASE_URL = 'DATABASE_URL',
}

enum OAUTH {
  /**
   * 구글 클라리언트 아이디
   */
  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  /**
   * 구글 시크릿 키
   */
  GOOGLE_SECERT_KEY = 'GOOGLE_SECERT_KEY',
  /**
   * 구글 리다이렉트 url
   */
  GOOGLE_REDIRECT_URL = 'GOOGLE_REDIRECT_URL',
  /**
   * JWT 시크릿 키
   */
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  /**
   * JWT 유효시간
   */
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',
}

enum AWS {
  /**
   * aws 엑세스 키
   */
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  /**
   * aws 시크릿 키
   */
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
}

export const CONFIG_KEY = {
  COMMON,
  DATABASE,
  OAUTH,
  AWS,
};
