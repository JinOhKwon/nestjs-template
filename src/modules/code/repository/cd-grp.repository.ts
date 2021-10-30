import { EntityRepository, Repository } from "typeorm";
import { CdGrp } from "../entity/cd-grp";

/**
 * 코드그룹 레파지토리
 */
@EntityRepository(CdGrp)
export class CdGrpRepository extends Repository<CdGrp> {

}
