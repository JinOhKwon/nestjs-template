import { ApiProperty } from "@nestjs/swagger";

/**
 * 인증 요청 데이터
 */
export class AuthRequest {
    /**
     * 사용자식별자
     */
    @ApiProperty()
    readonly userId: string;
    /**
     * 사용자비밀번호
     */
    @ApiProperty()
    readonly userPwd: string;
}
