import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { Equal, Like } from "typeorm";
import { UserResponse } from "../api/dto/response/user.response";
import { User } from "../entity/user";
import { UserError } from "../infrastructure/constants/user-error";
import { UserNotFoundException } from "../infrastructure/exception/user-not-found.exception";
import { UserService } from "./user.service";

/**
 * 사용자 조회 서비스
 */
@Injectable()
export class UserRetireveService {
    constructor(private readonly userService: UserService) { }
    /**
     * 전체 사용자 목록을 조회한다.
     *
     * @param userId 사용자식별자
     * @param userNm 사용자명
     */
    public async getList(userId?: string, userNm?: string): Promise<UserResponse[]> {
        const params: any = {};
        if (!_.isUndefined(userId)) {
            params.userId = Like(`%${userId}%`);
        }
        if (!_.isUndefined(userNm)) {
            params.userNm = Like(`%${userNm}%`);
        }

        return (await this.userService.getList(params)).toDtos();
    }

    /**
     * 특정 사용자를 조회한다.
     *
     * @param userId 사용자식별자
     */
    public async get(userId: string): Promise<UserResponse> {
        const user: User = (await this.userService.get({ userId: Equal(userId) }));

        if (_.isUndefined(user)) {
            throw new UserNotFoundException(UserError.USER001, userId);
        }

        return user.toDto();
    }
}
