import { Injectable } from "@nestjs/common";
import { FindConditions } from "typeorm";
import { CdDtl } from "../entity/cd-dtl";
import { CdDtlRepository } from "../repository/cd-dtl.repository";

/**
 * 코드상세 서비스
 */
@Injectable()
export class CdDtlService {
    constructor(
        private readonly cdDtlRepository: CdDtlRepository
    ) { }

    /**
     * 코드상세를 삭제한다.
     *
     * @param cdDtl 코드상세
     */
    async delete(conditions: FindConditions<CdDtl>): Promise<void> {
        this.cdDtlRepository.delete(conditions);
    }

    /**
     * 코드상세 저장한다.
     *
     * @param cdDtl 코드상세
     */
    async save(cdDtl: CdDtl): Promise<void> {
        this.cdDtlRepository.save(cdDtl);
    }
}
