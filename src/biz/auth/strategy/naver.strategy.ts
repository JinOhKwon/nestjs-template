import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CONFIG_KEY } from 'common';
import { ConfigService } from 'modules';
import { Strategy } from 'passport-naver';

/**
 * 네이버 인증 전략
 */
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  /**
   * 생성자
   *
   * @param configService 환경 서비스
   */
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get(CONFIG_KEY.OAUTH.NAVER_CLIENT_ID),
      clientSecret: configService.get(CONFIG_KEY.OAUTH.NAVER_CLIENT_SECRET),
      callbackURL: configService.get(CONFIG_KEY.OAUTH.NAVER_CALLBACK_URL),
    });
  }

  /**
   * 리디이렉트 된 정보를 확인한다.
   *
   * @param accessToken 엑세스토큰
   * @param refreshToken 리프레쉬 토큰
   * @param profile 정보
   * @param done 실행 콜백
   */
  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const userEmail = profile._json.email;
    const userNick = profile._json.nickname;
    const userProvider = profile.provider;
    const user = {
      userEmail,
      userNick,
      userProvider,
      accessToken,
      refreshToken,
    };

    return done(null, user);
  }
}
