import { AbstractEntity } from "common/AbstractEntity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CdDtl } from "./cd-dtl";
import * as _ from "lodash";
import { CdGrpResponse } from "../api/dto/cd-grp.response";

/**
 * 코드그룹 엔티티
 */
@Entity({ name: "tb_cd_grp" })
export class CdGrp extends AbstractEntity<CdGrpResponse> {
    dtoClass = CdGrpResponse;
    // 코드그룹 일련번호
    @PrimaryGeneratedColumn({ name: "cd_grp_seq", type: "bigint" })
    cdGrpSeq: number;

    // 코드그룹 아이디
    @Column({ name: "cd_grp_id", length: 100, unique: true })
    cdGrpId: string;

    // 코드그룹명
    @Column({ name: "cd_grp_nm", length: 50 })
    cdGrpNm: string;

    // 코드상세목록
    @OneToMany(() => CdDtl, cdDtl => cdDtl.cdGrp, { eager: true, cascade: true })
    cdDtls: CdDtl[];

    /**
     * 생성자
     *
     * @param cdGrpId 코드그룹 아이디
     * @param cdGrpNm 코드그룹명
     * @param cdDtls 코드상세목록
     */
    constructor(cdGrpId: string, cdGrpNm: string, cdDtls: CdDtl[]) {
        super();
        this.cdGrpId = cdGrpId;
        this.cdGrpNm = cdGrpNm;
        this.cdDtls = cdDtls;
    }

    /**
     * 코드그룹을변경한다.
     *
     * @param cdGrpId 코드 아이디
     * @param cdGrpNm 코드명
     * @param cdGrpUseYn 사용여부
     */
    modifyCdGrp = (cdGrpId: string, cdGrpNm: string, cdDtls: CdDtl[]): void => {
        this.cdGrpId = cdGrpId;
        this.cdGrpNm = cdGrpNm;
        this.cdDtls = cdDtls;
    }


    /**
     * 특정 코드상세를 반환한다.
     *
     * @param cdDtlId 코드상세 식별자
     */
    getCdDtl = (cdDtlId: string): CdDtl => {
        return _.find(this.cdDtls, cdDtl => cdDtl.cdDtlId === cdDtlId);
    }

    /**
     * 특정 코드상세를 반환한다.
     *
     * @param cdDtlNm 코드상세명
     */
    getCdDtlByNm = (cdDtlNm: string): CdDtl => {
        return _.find(this.cdDtls, cdDtl => cdDtl.cdDtlNm === cdDtlNm);
    }

    /**
     * 신규 코드상세를 등록한다.
     *
     * @param cdDtl 코드상세
     */
    addCdDtl = (cdDtl: CdDtl): void => {
        this.cdDtls.push(cdDtl);
    }

    /**
     * 특정 코드상세를 삭제한다.
     *
     * @param cdDtlId 코드상세 식별자
     */
    removeCdDtl = (cdDtlId: string): void => {
        const cdDtlIds: string[] = _.split(cdDtlId, ",");
        if (cdDtlIds.length > 1) {
            _.remove(this.cdDtls, cdDtl => cdDtlIds.includes(cdDtl.cdDtlId));
        }
        else {
            _.remove(this.cdDtls, cdDtl => cdDtl.cdDtlId === cdDtlId);
        }
    }

    /**
     * 다음 코드상세 식별자를 반환한다.
     */
    getNextCdDtlId = (): string => {
        const prefix = this.cdGrpId;
        let nextId = prefix + "000";
        if (_.isEmpty(this.cdDtls)) {
            return nextId;
        }

        const lastCdDtl: CdDtl = _.maxBy(this.cdDtls, dtl => Number(dtl.cdDtlSeq));
        const lastId = lastCdDtl.cdDtlId.split(prefix)[1];
        nextId = prefix + _.padStart((Number(lastId) + 1).toString(), 3, "0");

        return nextId;
    }
}
