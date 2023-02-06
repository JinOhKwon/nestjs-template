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
   * 레디스 시간
   */
  REDIS_TTL = 'REDIS_TTL',
  /**
   * DB 속성
   */
  DB_TYPE = 'DB_TYPE',
  /**
   * DB 주소
   */
  DB_HOST = 'DB_HOST',
  /**
   * DB 주소
   */
  DB_PORT = 'DB_PORT',
  /**
   * DB 도커 주소
   */
  DB_HOST_DOCKER = 'DB_HOST_DOCKER',
  /**
   * DB port
   */
  DB_MASTER_PORT = 'DB_MASTER_PORT',
  /**
   * DB port
   */
  DB_SLAVE_PORT = 'DB_SLAVE_PORT',
  /**
   * DB 사용자
   */
  DB_USERNAME = 'DB_USERNAME',
  /**
   * DB 패스워드
   */
  DB_PASSWORD = 'DB_PASSWORD',
  /**
   * DB 데이터베이스
   */
  DB_DATABASE = 'DB_DATABASE',
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
}

enum AWS {
  /**
   * JWT 시크릿 키
   */
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  /**
   * JWT 유효시간
   */
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',
}

export const CONFIG_KEY = {
  COMMON,
  DATABASE,
  OAUTH,
  AWS,
};
