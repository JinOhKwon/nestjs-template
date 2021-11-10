import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../../shared/services/config.service";
import { UserService } from "../user/service/user.service";
import { AuthRequest } from "./dto/request/auth.request";
import { AuthResponse } from "./dto/response/auth.response";
import { AuthTokenResponse } from "./dto/response/auth-token.response";
import { AuthException } from "./infrastructure/exception/auth-exception";
import { ContextProvider } from "src/providers/context.provider";
import { User } from "../user/entity/User";
import { AuthError } from "./infrastructure/constants/auth-error";
import { UtilsProvider } from "src/providers/utils.provider";
import { isUndefined } from "lodash";

/**
 * 인증 서비스
 */
@Injectable()
export class AuthService {
	/**
	 * 생성자
	 *
	 * @param jwtService jwt 서비스
	 * @param configService 환경 서비스
	 * @param userService 유저 서비스
	 */
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

    /**
     * 인증을 처리한다.
     *
     * @param req 요청
     */
    async auth(req: AuthRequest): Promise<AuthResponse> {
        const authUser = await this.userService.get({ userId: req.userId });

        // 사용자가 존재하지 않으면..
        if (isUndefined(authUser)) {
            throw new AuthException(AuthError.AUTH001);
        }

        // 비밀번호가 일치하지 않으면..
        const isMatchPwd = await UtilsProvider.validateHash(req.userPw, authUser && authUser.userPwd);
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
