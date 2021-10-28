import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthError } from "modules/auth/infrastructure/constants/AuthErrorEnum";
import * as _ from "lodash";
import { User } from "src/core/base/node_modules/modules/user/entity/User";
import { AuthException } from "modules/auth/infrastructure/exception/AuthException";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());

        // 역할이 필요하지 않은 거래일 경우
        if (!roles) {
            return true;
        }

        const user = context.switchToHttp().getRequest().user as User;
        // 사용자가 해당 리소스에 접근가능한 역할이 없다면...
        if (_.isEmpty(_.intersectionWith(roles, user.roles.map(role => role.roleId)))) {
            throw new AuthException(AuthError.AUTH004);
        }
        else {
            return true;
        }
    }
}
