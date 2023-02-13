/**
 * 인증 토큰 응답데이터
 */
export class AuthTokenResponse {
  /**
   * 유효시간
   */
  readonly expiresIn: number;
  /**
   * 엑세스 토큰
   */
  readonly accessToken: string;

  /**
   * 생성자
   *
   * @param data 데이터
   */
  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
