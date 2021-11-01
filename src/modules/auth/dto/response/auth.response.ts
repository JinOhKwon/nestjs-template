import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from "../../../user/api/dto/response/user.response";
import { AuthTokenResponse } from "./auth-token.response";

/**
 * 인증 응답데이터
 */
export class AuthResponse {
	/**
	 * 유저
	 */
	@ApiProperty()
	user: UserResponse;
	/**
	 * 토큰
	 */
	@ApiProperty()
	token: AuthTokenResponse;

	/**
	 * 생성자
	 *
	 * @param user 유저
	 * @param token 토큰
	 */
    constructor(user: UserResponse, token: AuthTokenResponse) {
        this.user = user;
        this.token = token;
    }
}
