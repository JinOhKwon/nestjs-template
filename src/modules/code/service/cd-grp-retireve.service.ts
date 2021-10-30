import { Injectable } from "@nestjs/common";
import { CodeGroupError } from "modules/code/infrastructure/constants/CodeGroupErrorEnum";
import * as _ from "lodash";
import { Equal, In } from "typeorm";
import { CdGrpResponse } from "../api/dto/cd-grp.response";
import { CdGrp } from "../entity/cd-grp";
import { CdGrpNotFoundException } from "../infrastructure/exception/cd-grp-not-found.exception";
import { CdGrpService } from "./cd-grp.service";

/**
 * 코드그룹 조회 서비스
 */
@Injectable()
export class CdGrpRetireveService {
    constructor(private readonly cdGrpService: CdGrpService) { }
    /**
     * 전체 코드그룹 목록을 조회한다.
     *
     * @param cdGrpId 코드그룹식별자
     * @param cdGrpNm 코드그룹명
     */
    public async getList(cdGrpIds?: string[]): Promise<CdGrpResponse[]> {
        return (await this.cdGrpService.getList(_.isUndefined(cdGrpIds) || _.isEmpty(cdGrpIds) ? {} : { cdGrpId: In(cdGrpIds) })).toDtos();
    }

    /**
     * 특정 코드그룹을 조회한다.
     *
     * @param cdGrpId 코드그룹식별자
     */
    public async get(cdGrpId: string): Promise<CdGrpResponse> {
        const cdGrp: CdGrp = await this.cdGrpService.get({ cdGrpId: Equal(cdGrpId) });

        if (_.isUndefined(cdGrp)) {
            throw new CdGrpNotFoundException(CodeGroupError.CDGRP001, cdGrpId);
        }

        return cdGrp.toDto();
    }
}
