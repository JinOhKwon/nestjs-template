import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService, CONFIG_KEY } from 'core';
import { isNil } from 'lodash';
import { AuthError } from 'modules/auth/infrastructure/constants/auth-error.enum';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthException } from '../infrastructure/exception/auth.exception';

/**
 * JWT 인증 전략
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * 생성자
   *
   * @param configService 환경 서비스
   * @param userService 사용자 서비스
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG_KEY.OAUTH.JWT_SECRET_KEY),
    });
  }

  /**
   * 인증된 사용자인지 확인한다.
   */
  async validate({ iat, exp }) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new AuthException(AuthError.AUTH005);
    }
    const authUser = '';
    // const authUser = await this.userService.get({ userId: Equal(userId) });

    if (isNil(authUser)) {
      throw new AuthException(AuthError.AUTH001);
    }

    return authUser;
  }
}
