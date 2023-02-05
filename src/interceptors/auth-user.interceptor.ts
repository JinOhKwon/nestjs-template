import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { User } from 'biz/user/entity/user.entity';
import { Observable } from 'rxjs';

/**
 * 사용자 인증 인터셉터이다.
 */
@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const user = request.user as User;
    // AuthService.setAuthUser(user);

    return next.handle();
  }
}
