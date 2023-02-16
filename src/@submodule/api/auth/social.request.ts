/**
 * 소셜 응답데이터
 */
export interface SocialRequest {
  /**
   * 사용자 이메일
   */
  userEmail: string;
  /**
   * 사용자 이름
   */
  userNick: string;
  /**
   * 엑세스 토큰
   */
  accessToken: string;
  /**
   * 리프레쉬 토큰
   */
  refreshToken: string;
  /**
   * 유저 제공 (매체별로 지원 여부 다름)
   */
  userProvider: any;
}
