/**
 * 인증 요청 데이터
 */
export class AuthRequest {
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

  /**
   * 생성자
   *
   * @param userId 사용자식별자
   * @param userNm 사용자명
   * @param userPwd 사용자비밀번호
   */
  constructor(userId: string, userNm: string, userPwd: string) {
    this.userId = userId;
    this.userNm = userNm;
    this.userPwd = userPwd;
  }
}
