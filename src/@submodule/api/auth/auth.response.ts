import { User } from '@prisma/client';
import { AuthTokenResponse } from './auth-token.response';

/**
 * 인증 응답데이터
 */
export interface AuthResponse {
  /**
   * 사용자
   */
  readonly user: User;
  /**
   * 사용자 토큰
   */
  readonly token: AuthTokenResponse;
}
