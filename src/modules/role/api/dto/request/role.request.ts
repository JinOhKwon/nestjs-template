import { ApiProperty } from "@nestjs/swagger";
import { YesOrNoEnum } from "common/constants/YesOrNoEnum";

/**
 * 역할 요청데이터
 */
export class RoleRequest {
    // 역할 아이디
    @ApiProperty()
    roleId: string;
    // 역할명
    @ApiProperty()
    roleNm: string;
    // 사용여부
    @ApiProperty()
    roleUseYn: YesOrNoEnum;

    /**
     * 생성자
     * 
     * @param roleId 역할 아이디
     * @param roleNm 역할명 
     * @param roleUseYn 사용여부 
     */
    constructor(roleId: string, roleNm: string, roleUseYn: YesOrNoEnum) {
        this.roleId = roleId;
        this.roleNm = roleNm;
        this.roleUseYn = roleUseYn;
    }
}