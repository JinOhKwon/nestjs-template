
/**
 * 인증 토큰 응답데이터
 */
export class AuthTokenResponse {
    expiresIn: number;
    accessToken: string;

    constructor(data: { expiresIn: number; accessToken: string }) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}
