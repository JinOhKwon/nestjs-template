import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthError } from "modules/auth/infrastructure/constants/AuthErrorEnum";
import * as _ from "lodash";
import { User } from "modules/user/entity/User";
import { ContextProvider } from "../../providers/ContextProvider";
import { UtilsProvider } from "../../providers/UtilsProvider";
import { ConfigService } from "../../shared/services/config.service";
import { UserService } from "../user/service/user.service";
import { AuthRequest } from "./dto/request/auth.request";
import { AuthResponse } from "./dto/response/auth.response";
import { AuthTokenResponse } from "./dto/response/auth-token.response";
import { AuthException } from "./infrastructure/exception/auth-exception";

/**
 * 인증 서비스
 */
@Injectable()
export class AuthService {
    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,

    ) { }

    /**
     * 컨텍스트에 사용자 정보를 담는다.
     *
     * @param user 사용자
     */
    static setAuthUser(user: User) {
        ContextProvider.set("auth", user);
    }

    //////////////////////////////////////////////////////////////////////

    /**
     * 인증을 처리한다.
     *
     * @param req 요청
     */
    async auth(req: AuthRequest): Promise<AuthResponse> {
        const authUser = await this.userService.get({ userId: req.userId });

        // 사용자가 존재하지 않으면..
        if (_.isUndefined(authUser)) {
            throw new AuthException(AuthError.AUTH001);
        }

        // 비밀번호가 일치하지 않으면..
        const isMatchPwd = await UtilsProvider.validateHash(req.userPwd, authUser && authUser.userPwd);
        if (!isMatchPwd) {
            throw new AuthException(AuthError.AUTH002);
        }

        const token: AuthTokenResponse = new AuthTokenResponse({
            expiresIn: this.configService.getNumber("JWT_EXPIRATION_TIME"),
            accessToken: await this.jwtService.signAsync({
                userId: authUser.userId,
                userNm: authUser.userNm,
                expiresIn: this.configService.getNumber("JWT_EXPIRATION_TIME")
            },
                { expiresIn: "1d" }),
        });

        return new AuthResponse(authUser.toDto(), token);
    }

}
