import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * 카카오 인증 가드
 */
@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {}
