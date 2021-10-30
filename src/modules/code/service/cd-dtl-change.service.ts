import { Injectable } from "@nestjs/common";
import { CodeDetailError } from "modules/code/infrastructure/constants/CodeDetailErrorEnum";
import { CodeGroupError } from "modules/code/infrastructure/constants/CodeGroupErrorEnum";
import * as _ from "lodash";
import { Equal, In } from "typeorm";
import { CdDtlRequest } from "../api/dto/request/cd-dtl.request";
import { CdDtl } from "../entity/cd-dtl";
import { CdGrp } from "../entity/cd-grp";
import { CdDtlDuplicateException } from "../infrastructure/exception/cd-dtl-duplicate.exception";
import { CdDtlNotFoundException } from "../infrastructure/exception/cd-dtl-not-found.exception";
import { CdGrpNotFoundException } from "../infrastructure/exception/cd-grp-not-found.exception";
import { CdDtlService } from "./cd-dtl.service";
import { CdGrpService } from "./cd-grp.service";

/**
 * 코드상세 변경 서비스
 */
@Injectable()
export class CdDtlChangeService {
    constructor(
        public cdGrpService: CdGrpService,
        public cdDtlService: CdDtlService,
    ) { }

    /**
     * 신규 코드상세를 등록한다.
     *
     * @param req 요청객체
     */
    async createCdDtl(cdGrpId: string, req: CdDtlRequest): Promise<void> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        if (!_.isUndefined(cdGrp.getCdDtlByNm(req.cdDtlNm))) {
            throw new CdDtlDuplicateException(CodeDetailError.CDDTL003, req.cdDtlNm);
        }

        const cdCtlId = cdGrp.getNextCdDtlId();
        const cdDtl: CdDtl = new CdDtl(cdCtlId, req.cdDtlNm, cdGrp.cdDtls.length);
        cdGrp.addCdDtl(cdDtl);

        await this.cdGrpService.save(cdGrp);
    }

    /**
     * 특정 코드상세를 수정한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param req 요청객체
     */
    async updateCdDtl(cdGrpId: string, cdDtlId: string, req: CdDtlRequest): Promise<void> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        const cdDtl: CdDtl = cdGrp.getCdDtl(cdDtlId);
        if ((_.isUndefined(cdDtl))) {
            throw new CdDtlNotFoundException(CodeDetailError.CDDTL001, cdDtlId);
        }

        cdDtl.modifyCdDtl(req);
        await this.cdGrpService.save(cdGrp);
    }

    /**
     * 특정 코드상세를 삭제한다.
     *
     * @param cdDtl 코드상세
     */
    async deleteCdDtl(cdGrpId: string, cdDtlId: string): Promise<void> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        const cdDtlIds: string[] = _.split(cdDtlId, ",");
        await this.cdDtlService.delete({ cdDtlId: In(cdDtlIds) });
    }
}
