import { ApiProperty } from "@nestjs/swagger";

/**
 * 인증 토큰 응답데이터
 */
export class AuthTokenResponse {
	/**
	 * 만료 시간
	 */
	@ApiProperty()
	expiresIn: number;
	/**
	 * 토큰
	 */
	@ApiProperty()
    accessToken: string;

	/**
	 * 생성자
	 *
	 * @param data 데이터
	 */
    constructor(data: { expiresIn: number; accessToken: string }) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}
