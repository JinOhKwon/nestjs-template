import { AbstractDto } from "common/dto/AbstractDto";
import { CdGrp } from "modules/code/entity/CdGrp";
import { CdDtlResponse } from "./cd-dtl.response";

/**
 * 코드그룹 응답데이터
 */
export class CdGrpResponse extends AbstractDto {
    // 코드그룹 식별자
    cdGrpId: string;
    // 코드그룹명
    cdGrpNm: string;
    // 코드상세 목록
    cdDtls: CdDtlResponse[];

    /**
     * 생성자
     *
     * @param cdGrp 코드그룹
     */
    constructor(cdGrp: CdGrp) {
        super(cdGrp);
        this.cdGrpId = cdGrp.cdGrpId;
        this.cdGrpNm = cdGrp.cdGrpNm;
        this.cdDtls = cdGrp.cdDtls.toDtos();
    }
}
