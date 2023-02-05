import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * 네이버 인증가드
 */
@Injectable()
export class NaverAuthGuard extends AuthGuard('naver') {}
