import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthRequest, AuthResponse, SocialRequest } from '@submodule/api';
import { ConfigService, CONFIG_KEY } from 'core';
import { isNil } from 'lodash';
import { AuthError } from 'modules/auth/infrastructure/constants/auth-error.enum';
import { AuthTokenResponse } from '../../@submodule/api/auth/auth-token.response';
import { AuthException } from './infrastructure/exception/auth.exception';

/**
 * 인증 서비스
 */
@Injectable()
export class AuthService {
  /**
   * 생성자
   *
   * @param jwtService 인증 서비스
   * @param configService 환경 서비스
   * @param userService 유저 서비스
   */
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  // /**
  //  * 컨텍스트에 사용자 정보를 담는다.
  //  *
  //  * @param user 사용자
  //  */
  // static setAuthUser(user: User) {
  //   ContextProvider.set('auth', user);
  // }

  /**
   * 인증을 처리한다.
   *
   * @param req 요청
   */
  async auth(req: AuthRequest): Promise<AuthResponse> {
    let user: User;

    const authUser = {}; // await this.userService.get(req.userId);

    // 사용자가 존재하지 않으면..
    if (isNil(authUser)) {
      throw new AuthException(AuthError.AUTH001);
    }

    // // 비밀번호가 일치하지 않으면..
    // const isMatchPwd = await UtilsProvider.validateHash(req.userPwd, authUser && user.userPwd);
    // if (!isMatchPwd) {
    //   throw new AuthException(AuthError.AUTH002);
    // }

    const token: AuthTokenResponse = {
      expiresIn: this.configService.getNumber(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
      accessToken: await this.jwtService.signAsync(
        {
          userId: req.userId,
          userNm: req.userNm,
          expiresIn: this.configService.getNumber(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
        },
        { expiresIn: '1d' },
      ),
    };

    return {
      user,
      token,
    };
  }

  /**
   * 소셜 인증을 처리한다.
   */
  async socialAuth(req: SocialRequest): Promise<AuthResponse> {
    let user: User;

    const authUser = {}; // await this.userService.get(req.user.userEmail);

    // 사용자가 존재하지 않으면..
    if (isNil(authUser)) {
      // TODO 사용자를 등록한다.
    }

    const token: AuthTokenResponse = {
      expiresIn: this.configService.getNumber(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
      accessToken: await this.jwtService.signAsync(
        {
          userId: req.userEmail,
          userNm: req.userNick,
          expiresIn: this.configService.getNumber(CONFIG_KEY.OAUTH.JWT_EXPIRATION_TIME),
        },
        { expiresIn: '1d' },
      ),
    };

    return {
      user,
      token,
    };
  }
}
