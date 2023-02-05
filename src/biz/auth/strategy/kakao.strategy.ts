import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CONFIG_KEY } from 'common';
import { ConfigService } from 'modules';
import { Strategy } from 'passport-kakao';

/**
 * 카카오 인증 전략
 */
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  /**
   * 생성자
   *
   * @param configService 환경 서비스
   */
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get(CONFIG_KEY.OAUTH.KAKAO_KEY),
      callbackURL: configService.get(CONFIG_KEY.OAUTH.KAKAO_REDIRECT_URL),
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
    // 이메일 받으려면 앱 검수 필요
    const userEmail = profile._json.kakao_account.email;
    const userNick = profile._json.properties.nickname;
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
