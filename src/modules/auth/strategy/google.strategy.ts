import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService, CONFIG_KEY } from 'core/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

/**
 * 구글 인증 전략
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * 생성자
   *
   * @param configService 환경 서비스
   */
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get(CONFIG_KEY.OAUTH.GOOGLE_CLIENT_ID),
      clientSecret: configService.get(CONFIG_KEY.OAUTH.GOOGLE_SECERT_KEY),
      callbackURL: configService.get(CONFIG_KEY.OAUTH.GOOGLE_REDIRECT_URL),
      scope: ['email', 'profile'],
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
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      userEmail: emails[0].value,
      userNick: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
