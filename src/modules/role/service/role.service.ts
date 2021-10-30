import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, FindConditions } from "typeorm";
import { Role } from "../entity/role";
import { RoleRepository } from "../repository/role.repository";

/**
 * 역할 서비스
 */
@Injectable()
export class RoleService {
    /**
     * 생성자이다.
     *
     * @param roleRepository 역할 레파지토리
     */
    constructor(
        private readonly roleRepository: RoleRepository) { }

    /**
     * 전체 역할 목록을 조회한다.
     */
    async getList(conditions?: FindConditions<Role>): Promise<Role[]> {
        return await this.roleRepository.find(conditions);
    }

    /**
     * 전체 역할 목록을 조회한다.
     *
     * @param conditions 조건
     */
    async get(conditions: FindConditions<Role>): Promise<Role> {
        return await this.roleRepository.findOne(conditions);
    }

    /**
     * 역할을 등록한다.
     *
     * @param role 역할
     */
    async create(role: Role): Promise<Role> {
        const newRole = this.roleRepository.create(role);
        return this.roleRepository.save(newRole);
    }

    /**
     * 역할을 삭제한다.
     *
     * @param role 역할
     */
    async delete(conditions: FindConditions<Role>): Promise<void> {
        this.roleRepository.delete(conditions);
    }

    /**
     * 역할 건수를 조회한다.
     *
     * @param conditions 조건
     */
    async getCount(findData: FindConditions<Role>): Promise<number> {
        return await this.roleRepository.count(findData);
    }

    /**
     * 역할이 존재하는지 확인한다.
     *
     * @param roleId 역할식별자
     */
    async isDup(roleId: string): Promise<boolean> {
        const role: Role = await this.roleRepository.findOne({ roleId: Equal(roleId) });
        return !(_.isUndefined(role));
    }

    /**
     * 역할 엔티티 트렌젝션을 save한다.
     *
     * @param role 역할
     */
    async save(role: Role): Promise<void> {
        this.roleRepository.save(role);
    }
}
