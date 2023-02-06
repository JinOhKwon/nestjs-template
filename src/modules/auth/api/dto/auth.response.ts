import { User } from 'modules/user/entity/user.entity';
import { AuthTokenResponse } from './auth-token.response';

/**
 * 인증 응답데이터
 */
export class AuthResponse {
  /**
   * 사용자
   */
  readonly user: User;
  /**
   * 사용자 토큰
   */
  readonly token: AuthTokenResponse;

  /**
   * 생성자
   *
   * @param user 사용자
   * @param token 사용자 토큰
   */
  constructor(user: User, token: AuthTokenResponse) {
    this.user = user;
    this.token = token;
  }
}
