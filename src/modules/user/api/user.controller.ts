import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthRole } from "common/constants/AuthRole";
import { Roles } from "decorators/RolesDecorator";
import { Response } from "express";
import { JwtAuthGuard } from "guards/JwtAuthGuard";
import { RolesGuard } from "guards/RolesGuard";
import { AuthUserInterceptor } from "interceptors/AuthUserInterceptor";
import { UserChangeService } from "../service/user-change.service";
import { UserRetireveService } from "../service/user.retireve.service";
import { UserRequest } from "./dto/request/user.request";
import { UserResponse } from "./dto/response/user.response";

/**
 * 사용자 컨트롤러이다.
 */
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags("users")
@Controller("users")
export class UserController {
    constructor(
        private userRetireveService: UserRetireveService,
        private userChangeService: UserChangeService
    ) { }

    /**
     * 전제 사용자 목록을 조회한다.
     *
     * @param userId 사용자식별자
     * @param userNm 사용자명
     * @param res 응답 데이터
     */
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
    @ApiQuery({ name: "userId", required: false, type: String })
    @ApiQuery({ name: "userNm", required: false, type: String })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async getList(@Query("userId") userId: string, @Query("userNm") userNm: string, @Res() res: Response) {
        const userResponses: UserResponse[] = await this.userRetireveService.getList(userId, userNm);

        res.status(HttpStatus.OK).send({ data: { userResponses } });
    }

    /**
     * 특정 사용자를 조회한다.
     *
     * @param userId 사용자식별자
     * @param res 응답 데이터
     */
    @Get(":userId")
    @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async get(@Param("userId") userId: string, @Res() res: Response) {
        const userResponse: UserResponse = await this.userRetireveService.get(userId);

        res.status(HttpStatus.OK).send({ data: { userResponse } });
    }

    /**
     * 신규 사용자를 등록한다.
     *
     * @param userRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async create(@Body() userRequest: UserRequest, @Res() res: Response) {
        await this.userChangeService.createUser(userRequest);



        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 사용자를 변경한다.
     *
     * @param userId 사용자식별자
     * @param userRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Put(":userId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async update(@Param("userId") userId: string, @Body() userRequest: UserRequest, @Res() res: Response) {
        await this.userChangeService.updateUser(userId, userRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 사용자를 삭제한다.
     *
     * @param userId 사용자식별자
     * @param res 응답 데이터
     */
    @Delete(":userId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async delete(@Param("userId") userId: string, @Res() res: Response) {
        await this.userChangeService.deleteUser(userId);

        res.status(HttpStatus.CREATED).send();
    }
}
