import { AbstractEntity } from "common/AbstractEntity";

/**
 * 최상위 응답 DTO이다.
 */
export class AbstractDto {
    // 등록자
    regId: string;
    // 등록자명
    regNm: string;
    // 등록일시
    regDt: Date;
    // 변경자
    chgId: string;
    // 변경자명
    chgNm: string;
    // 변경일시
    chgDt: Date;

    /**
     * 생성자
     * 
     * @param entity entity 추상엔티티
     */
    constructor(entity: AbstractEntity) {
        this.regId = entity.regId;
        this.regNm = entity.regNm;
        this.regDt = entity.regDt;
        this.chgId = entity.chgId;
        this.chgNm = entity.chgNm;
        this.chgDt = entity.chgDt;
    }
}
