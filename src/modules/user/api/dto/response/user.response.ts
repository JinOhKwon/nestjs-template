import { YesOrNoEnum } from "src/core/base/constants/yes-or-no";
import { AbstractDto } from "src/core/base/dto/abstract-dto";
import { RoleResponse } from "src/modules/role/api/dto/response/role.response";
import { User } from "src/modules/user/entity/User";

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
