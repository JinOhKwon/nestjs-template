import { AbstractDto } from "common/dto/AbstractDto";
import { CdDtl } from "modules/code/entity/CdDtl";

/**
 * 코드상세 응답데이터
 */
export class CdDtlResponse extends AbstractDto {
    // 코드상세 아이디
    cdDtlId: string;
    // 코드상세명
    cdDtlNm: string;
    // 사용여부
    cdDtlOrd: number;

    /**
     * 생성자
     * 
     * @param cdDtl 코드상세
     */
    constructor(cdDtl: CdDtl) {
        super(cdDtl);
        this.cdDtlId = cdDtl.cdDtlId;
        this.cdDtlNm = cdDtl.cdDtlNm;
        this.cdDtlOrd = cdDtl.cdDtlOrd;
    }
}