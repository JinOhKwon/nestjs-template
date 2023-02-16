/**
 * 인증 토큰 응답데이터
 */
export interface AuthTokenResponse {
  /**
   * 유효시간
   */
  readonly expiresIn: number;
  /**
   * 엑세스 토큰
   */
  readonly accessToken: string;
}
