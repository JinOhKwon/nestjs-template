import { ApiProperty } from "@nestjs/swagger";

/**
 * 코드상세 요청데이터
 */
export class CdDtlRequest {
    // 코드상세명
    @ApiProperty()
    cdDtlNm: string;

    /**
     * 생성자
     * 
     * @param cdDtlNm 코드상세명 
     */
    constructor(cdDtlNm: string) {
        this.cdDtlNm = cdDtlNm;
    }
}