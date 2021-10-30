import { Injectable } from "@nestjs/common";
import { CodeGroupError } from "modules/code/infrastructure/constants/CodeGroupErrorEnum";
import { Equal } from "typeorm";
import { CdGrpRequest } from "../api/dto/request/cd-grp.request";
import { CdGrp } from "../entity/cd-grp";
import { CdGrpDuplicateException } from "../infrastructure/exception/cd-grp-duplicate.exception";
import { CdDtlService } from "./cd-dtl.service";
import { CdGrpService } from "./cd-grp.service";

/**
 * 코드그룹 변경 서비스
 */
@Injectable()
export class CdGrpChangeService {
    constructor(
        public cdGrpService: CdGrpService,
        public cdDtlService: CdDtlService,
    ) { }

    /**
     * 신규 코드그룹을 등록한다.
     *
     * @param req 요청객체
     */
    async createCdGrp(req: CdGrpRequest): Promise<void> {
        // 동일한 코드그룹이 존재한다면...
        if ((await this.cdGrpService.isDup(req.cdGrpId))) {
            throw new CdGrpDuplicateException(CodeGroupError.CDGRP002, req.cdGrpId);
        }

        const cdGrp: CdGrp = new CdGrp(req.cdGrpId, req.cdGrpNm, null);

        await this.cdGrpService.create(cdGrp);
    }

    /**
     * 특정 코드그룹을 수정한다.
     *
     * @param cdGrpId 코드그룹식별자
     * @param req 요청객체
     */
    async updateCdGrp(cdGrpId: string, req: CdGrpRequest): Promise<void> {
        // 동일한 코드그룹이 존재한다면...
        if (cdGrpId !== req.cdGrpId && (await this.cdGrpService.isDup(req.cdGrpId))) {
            throw new CdGrpDuplicateException(CodeGroupError.CDGRP002, req.cdGrpId);
        }

        const cdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        cdGrp.modifyCdGrp(req.cdGrpId, req.cdGrpNm, cdGrp.cdDtls);

        await this.cdGrpService.save(cdGrp);
    }

    /**
     * 특정 코드그룹을 삭제한다.
     *
     * @param cdGrp 코드그룹
     */
    async deleteCdGrp(cdGrpId: string): Promise<void> {
        await this.cdGrpService.delete({ cdGrpId: Equal(cdGrpId) });
    }
}
