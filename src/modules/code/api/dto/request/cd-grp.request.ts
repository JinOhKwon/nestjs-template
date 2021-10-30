import { ApiProperty } from "@nestjs/swagger";

/**
 * 코드그룹 요청데이터
 */
export class CdGrpRequest {
    // 코드 아이디
    @ApiProperty()
    cdGrpId: string;
    // 코드명
    @ApiProperty()
    cdGrpNm: string;

    /**
     * 생성자
     * 
     * @param cdGrpId 코드 아이디
     * @param cdGrpNm 코드명 
     */
    constructor(cdGrpId: string, cdGrpNm: string) {
        this.cdGrpId = cdGrpId;
        this.cdGrpNm = cdGrpNm;
    }
}