import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, FindConditions } from "typeorm";
import { CdGrp } from "../entity/cd-grp";
import { CdGrpRepository } from "../repository/cd-grp.repository";

/**
 * 코드그룹 서비스
 */
@Injectable()
export class CdGrpService {
    /**
     * 생성자이다.
     *
     * @param cdGrpRepository 코드그룹 레파지토리
     */
    constructor(
        private readonly cdGrpRepository: CdGrpRepository) { }

    /**
     * 전체 코드그룹 목록을 조회한다.
     */
    async getList(conditions?: FindConditions<CdGrp>): Promise<CdGrp[]> {
        return await this.cdGrpRepository.find(conditions);
    }

    /**
     * 전체 코드그룹 목록을 조회한다.
     *
     * @param conditions 조건
     */
    async get(conditions: FindConditions<CdGrp>): Promise<CdGrp> {
        return await this.cdGrpRepository.findOne(conditions);
    }

    /**
     * 코드그룹을 등록한다.
     *
     * @param cdGrp 코드그룹
     */
    async create(cdGrp: CdGrp): Promise<CdGrp> {
        return this.cdGrpRepository.save(this.cdGrpRepository.create(cdGrp));
    }

    /**
     * 코드그룹을 삭제한다.
     *
     * @param cdGrp 코드그룹
     */
    async delete(conditions: FindConditions<CdGrp>): Promise<void> {
        this.cdGrpRepository.delete(conditions);
    }

    /**
     * 코드그룹 건수를 조회한다.
     *
     * @param conditions 조건
     */
    async getCount(findData: FindConditions<CdGrp>): Promise<number> {
        return await this.cdGrpRepository.count(findData);
    }

    /**
     * 코드그룹이 존재하는지 확인한다.
     *
     * @param cdGrpId 코드그룹식별자
     */
    async isDup(cdGrpId: string): Promise<boolean> {
        const cdGrp: CdGrp = await this.cdGrpRepository.findOne({ cdGrpId: Equal(cdGrpId) });
        return !(_.isUndefined(cdGrp));
    }

    /**
     * 코드그룹을 저장한다.
     *
     * @param cdGrp 코드그룹
     */
    async save(cdGrp: CdGrp): Promise<void> {
        this.cdGrpRepository.save(cdGrp);
    }
}
