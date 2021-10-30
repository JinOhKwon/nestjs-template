import { Injectable } from "@nestjs/common";
import { CodeGroupError } from "modules/code/infrastructure/constants/CodeGroupErrorEnum";
import * as _ from "lodash";
import { Equal } from "typeorm";
import { CdDtlResponse } from "../api/dto/response/cd-dtl.response";
import { CdGrp } from "../entity/cd-grp";
import { CdDtlNotFoundException } from "../infrastructure/exception/cd-dtl-not-found.exception";
import { CdGrpNotFoundException } from "../infrastructure/exception/cd-grp-not-found.exception";
import { CdGrpService } from "./cd-grp.service";

/**
 * 코드상세 조회 서비스
 */
@Injectable()
export class CdDtlRetireveService {
    constructor(
        private readonly cdGrpService: CdGrpService
    ) { }
    /**
     * 전체 코드상세 목록을 조회한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param cdDtlNm 코드상세명
     */
    public async getList(cdGrpId: string): Promise<CdDtlResponse[]> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.cdDtls.toDtos();
    }

    /**
     * 특정 코드상세를 조회한다.
     *
     * @param cdGrpId 코드그룹식별자
     * @param cdDtlId 코드상세식별자
     */
    public async get(cdGrpId: string, cdDtlId: string): Promise<CdDtlResponse> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdDtlNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.getCdDtl(cdDtlId).toDto();
    }
}
