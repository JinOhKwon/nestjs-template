import { Injectable } from "@nestjs/common";
import { RoleError } from "modules/role/infrastructure/constants/RoleErrorEnum";
import * as _ from "lodash";
import { Equal, In } from "typeorm";
import { RoleResponse } from "../api/dto/response/role.response";
import { Role } from "../entity/role";
import { RoleNotFoundException } from "../infrastructure/exception/role-not-found.exception";
import { RoleService } from "./role.service";

/**
 * 역할 조회 서비스
 */
@Injectable()
export class RoleRetireveService {
    constructor(private readonly roleService: RoleService) { }
    /**
     * 전체 역할 목록을 조회한다.
     *
     * @param roleId 역할식별자
     * @param roleNm 역할명
     */
    public async getList(roleIds?: string[]): Promise<RoleResponse[]> {
        return (_.isUndefined(roleIds) || _.isEmpty(roleIds)) ? [] : await this.roleService.getList({ roleId: In(roleIds) });
    }

    /**
     * 특정 역할을 조회한다.
     *
     * @param roleId 역할식별자
     */
    public async get(roleId: string): Promise<RoleResponse> {
        const role: Role = (await this.roleService.get({ roleId: Equal(roleId) }));

        if (_.isUndefined(role)) {
            throw new RoleNotFoundException(RoleError.ROLE001, roleId);
        }

        return role.toDto();
    }
}
