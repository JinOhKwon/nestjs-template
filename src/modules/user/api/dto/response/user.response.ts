import { RoleResponse } from "modules/role/api/dto/RoleResponse";
import { User } from "modules/user/entity/User";
import { AbstractDto } from "../../../../common/dto/AbstractDto";
import { YesOrNoEnum } from "common/constants/YesOrNoEnum";

/**
 * 사용자 응답 데이터
 */
export class UserResponse extends AbstractDto {
    // 사용자 아이디
    userId: string;
    // 사용자명
    userNm: string;
    // 비밀번호
    userPwd: string;
    // 연락처
    userPhone: string;
    // 사용여부
    userUseYn: YesOrNoEnum;
    // 역할목록
    roles: RoleResponse[];

    constructor(user: User) {
        super(user);
        this.userId = user.userId;
        this.userNm = user.userNm;
        this.userPwd = user.userPwd;
        this.userPhone = user.userPhone;
        this.userUseYn = user.userUseYn;
        this.roles = user.roles.toDtos();
    }
}