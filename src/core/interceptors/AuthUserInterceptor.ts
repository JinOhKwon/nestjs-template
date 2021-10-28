import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthService } from "modules/auth/AuthService";
import { User } from "src/core/base/node_modules/modules/user/entity/User";
import { Observable } from "rxjs";

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const user = request.user as User;
        AuthService.setAuthUser(user);

        return next.handle();
    }
}
