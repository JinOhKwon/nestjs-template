import { EntityRepository, Repository } from "typeorm";
import { CdDtl } from "../entity/cd-dtl";

/**
 * 코드상세 상세레파지토리
 */
@EntityRepository(CdDtl)
export class CdDtlRepository extends Repository<CdDtl> {

}
