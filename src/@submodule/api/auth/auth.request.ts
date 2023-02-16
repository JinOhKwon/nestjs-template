/**
 * 인증 요청 데이터
 */
export interface AuthRequest {
  /**
   * 사용자식별자
   */
  readonly userId: string;

  /**
   * 사용자명
   */
  readonly userNm: string;

  /**
   * 사용자비밀번호
   */
  readonly userPwd: string;
}
