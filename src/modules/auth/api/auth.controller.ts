import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthRequest, AuthResponse, SocialRequest } from '@submodule/api';
import { AuthService } from '../auth.service';
import { GoogleAtuhGuard } from '../guards/google-auth.guard';

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
}
