import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Role } from "modules/role/entity/Role";
import { RoleService } from "modules/role/service/RoleService";
import { Equal, In } from "typeorm";
import { UserRequest } from "../api/dto/request/user.request";
import { User } from "../entity/user";
import { UserError } from "../infrastructure/constants/user-error";
import { UserDuplicateException } from "../infrastructure/exception/user-duplicate.exception";
import { UserService } from "./user.service";

/**
 * 사용자 변경 서비스
 */
@Injectable()
export class UserChangeService {
    constructor(
        public userService: UserService,
        public roleService: RoleService,
    ) { }

    /**
     * 신규 사용자를 등록한다.
     *
     * @param req 요청객체
     */
    async createUser(req: UserRequest): Promise<void> {
        // 동일한 사용자가 존재한다면...
        if ((await this.userService.isDup(req.userId))) {
            throw new UserDuplicateException(UserError.USER002, req.userId);
        }

        // 신규 사용자와 역할을 생성한다.
        const userRoles: Role[] = (_.isUndefined(req.roleIds) || _.isEmpty(req.roleIds)) ? [] : await this.roleService.getList({ roleId: In(req.roleIds) });
        const user: User = new User(req.userId, req.userNm, req.userPwd, req.userPhone, req.userUseYn, userRoles);

        await this.userService.create(user);
    }

    /**
     * 특정 사용자를 수정한다.
     *
     * @param userId 사용자식별자
     * @param req 요청객체
     */
    async updateUser(userId: string, req: UserRequest): Promise<void> {
        // 동일한 사용자가 존재한다면...
        if (userId !== req.userId && (await this.userService.isDup(req.userId))) {
            throw new UserDuplicateException(UserError.USER002, req.userId);
        }

        const user = await this.userService.get({ userId: Equal(userId) });

        // 사용자와 역할을 변경한다.
        const userRoles: Role[] = (_.isUndefined(req.roleIds) || _.isEmpty(req.roleIds)) ? [] : await this.roleService.getList({ roleId: In(req.roleIds) });
        user.modifyUser(req.userId, req.userNm, req.userPwd, req.userPhone, req.userUseYn, userRoles);

        await this.userService.save(user);
    }

    /**
     * 특정 사용자를 삭제한다.
     *
     * @param user 사용자
     */
    async deleteUser(userId: string): Promise<void> {
        await this.userService.delete({ userId: Equal(userId) });
    }
}
