import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 구글 인증 가드
 */
@Injectable()
export class GoogleAtuhGuard extends AuthGuard('google') {}
