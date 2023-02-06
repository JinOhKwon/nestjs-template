import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GoogleAtuhGuard } from '../guards/google-auth.guard';
import { KakaoAuthGuard } from '../guards/kakao-auth.guard';
import { NaverAuthGuard } from '../guards/naver-auth.guard';
import { AuthRequest } from './dto/auth.request';
import { AuthResponse } from './dto/auth.response';
import { SocialRequest } from './dto/social.request';

/**
 * 인증 컨트롤러이다.
 */
@Controller('auth')
export class AuthController {
  /**
   * 생성자
   *
   * @param authService 인증 서비스
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인을 한다.
   *
   * @param authRequest 사용자 요청
   * @returns 인증 정보
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() authRequest: AuthRequest): Promise<AuthResponse> {
    return await this.authService.auth(authRequest);
  }

  /**
   * 구글 로그인을 한다.
   */
  @Get('google/login')
  @UseGuards(GoogleAtuhGuard)
  async googleAuth() {
    // Guard redirects
  }

  /**
   * 구글 로그인 리다이렉트 주소(Oauth 2.0)
   */
  @Get('google/redirect')
  @UseGuards(GoogleAtuhGuard)
  async googleAuthRedirect(@Req() req: SocialRequest) {
    return await this.authService.socialAuth(req);
  }

  /**
   * 카카오 로그인을 한다.
   */
  @Get('kakao/login')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    // Guard redirects
  }

  /**
   * 카카오 로그인 리다이렉트 주소(Oauth 2.0)
   */
  @Get('kakao/redirect')
  @UseGuards(KakaoAuthGuard)
  async kakaoRedirect(@Req() req: SocialRequest) {
    return await this.authService.socialAuth(req);
  }

  /**
   * 네이버 로그인을 한다.
   */
  @Get('/naver/login')
  @UseGuards(NaverAuthGuard)
  async naverLogin() {
    // Guard redirects
  }

  /**
   * 네이버 로그인 리다이렉트 주소(Oauth 2.0)
   */
  @Get('/naver/redirect')
  @UseGuards(NaverAuthGuard)
  async naverRedirect(@Req() req: SocialRequest) {
    return await this.authService.socialAuth(req);
  }
}
