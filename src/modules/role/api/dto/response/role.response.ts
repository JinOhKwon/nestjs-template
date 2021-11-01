import { YesOrNoEnum } from "src/core/base/constants/yes-or-no";
import { AbstractDto } from "src/core/base/dto/abstract-dto";
import { Role } from "src/modules/role/entity/role";

/**
 * 역할 응답데이터
 */
export class RoleResponse extends AbstractDto {
    // 역할 아이디
    roleId: string;
    // 역할명
    roleNm: string;
    // 사용여부
    roleUseYn: YesOrNoEnum;

    /**
     * 생성자
     *
     * @param roleId 역할 아이디
     * @param roleNm 역할명
     * @param roleUseYn 사용여부
     */
    constructor(role: Role) {
        super(role);
        this.roleId = role.roleId;
        this.roleNm = role.roleNm;
        this.roleUseYn = role.roleUseYn;
    }
}
