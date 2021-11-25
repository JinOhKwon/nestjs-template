import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/modules/auth/service/auth.service";
import { User } from "src/modules/user/entity/User";

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const user = request.user as User;
        AuthService.setAuthUser(user);

        return next.handle();
    }
}
