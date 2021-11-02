import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { isUndefined } from "lodash";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/shared/services/config.service";
import { Equal } from "typeorm";
import { UserService } from "../user/service/user.service";
import { AuthError } from "./infrastructure/constants/auth-error";
import { AuthException } from "./infrastructure/exception/auth-exception";

/**
 * JWT 인증 전략
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	/**
	 * 생성자
	 *
	 * @param configService 환경 서비스
	 * @param userService 유저 서비스
	 */
    constructor(
        public readonly configService: ConfigService,
        public readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET_KEY"),
        });
    }

    /**
     * 인증된 사용자인지 확인한다.
     */
    async validate({ iat, exp, userId }) {
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            throw new AuthException(AuthError.AUTH005);
        }
        const authUser = await this.userService.get({ userId: Equal(userId) });

        if (isUndefined(authUser)) {
            throw new AuthException(AuthError.AUTH001);
        }

        return authUser;
    }
}
