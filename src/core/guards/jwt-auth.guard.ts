import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthError } from "modules/auth/infrastructure/constants/AuthErrorEnum";
import { TokenExpiredError } from "jsonwebtoken";
import { AuthException } from "modules/auth/infrastructure/exception/AuthException";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // 토큰 만료시...
        if (info && info instanceof TokenExpiredError) {
            throw new AuthException(AuthError.AUTH005);
        }
        if (err || !user) {
            throw err || new AuthException(AuthError.AUTH003);
        }

        return user;
    }
}