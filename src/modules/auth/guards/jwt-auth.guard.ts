import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthError } from 'modules/auth/infrastructure/constants/auth-error.enum';
import { AuthException } from 'modules/auth/infrastructure/exception/auth.exception';

/**
 * jwt 인증 가드
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   * 요청 들어온 값을 핸들링한다.
   *
   * @param err 에러
   * @param user 유저
   * @param info 정보
   * @returns 유저
   */
  handleRequest(err: any, user: any, info: any) {
    // 토큰 만료시...
    if (info && info instanceof TokenExpiredError) {
      throw new AuthException(AuthError.AUTH005);
    }
    if (err || !user) {
      throw err || new AuthException(AuthError.AUTH003);
    }

    return user;
  }
}
