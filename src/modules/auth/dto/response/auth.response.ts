import { UserResponse } from "../../../user/api/dto/response/user.response";
import { AuthTokenResponse } from "./auth-token.response";

/**
 * 인증 응답데이터
 */
export class AuthResponse {
    user: UserResponse;
    token: AuthTokenResponse;
    constructor(user: UserResponse, token: AuthTokenResponse) {
        this.user = user;
        this.token = token;
    }
}
