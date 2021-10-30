import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRole } from "common/constants/AuthRole";
import { Roles } from "decorators/RolesDecorator";
import { Response } from "express";
import { JwtAuthGuard } from "guards/JwtAuthGuard";
import { RolesGuard } from "guards/RolesGuard";
import { AuthUserInterceptor } from "interceptors/AuthUserInterceptor";
import { CdGrpRetireveService } from "../service/cd-grp-retireve.service";
import { CdGrpChangeService } from "../service/cd-grp-change.service";
import { CdGrpResponse } from "./dto/cd-grp.response";
import { CdGrpRequest } from "./dto/request/cd-grp.request";

/**
 * 코드 컨트롤러이다.
 */
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags("cdGrps")
@Controller("cdGrps")
export class CdGrpController {
    constructor(
        private cdGrpRetireveService: CdGrpRetireveService,
        private cdGrpChangeService: CdGrpChangeService) { }

    /**
     * 전제 코드 목록을 조회한다.
     *
     * @param cdGrpId 코드식별자
     * @param cdGrpNm 코드명
     * @param res 응답 데이터
     */
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: CdGrpResponse })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async getList(@Res() res: Response) {
        const cdGrpResponses: CdGrpResponse[] = await this.cdGrpRetireveService.getList();

        res.status(HttpStatus.OK).send({ data: { cdGrpResponses } });
    }

    /**
     * 특정 코드를 조회한다.
     *
     * @param cdGrpId 코드식별자
     * @param res 응답 데이터
     */
    @Get(":cdGrpId")
    @ApiResponse({ status: HttpStatus.OK, type: CdGrpResponse })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async get(@Param("cdGrpId") cdGrpId: string, @Res() res: Response) {
        const cdGrpResponse: CdGrpResponse = await this.cdGrpRetireveService.get(cdGrpId);

        res.status(HttpStatus.OK).send({ data: { cdGrpResponse } });
    }

    /**
     * 신규 코드를 등록한다.
     *
     * @param cdGrpRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async create(@Body() cdGrpRequest: CdGrpRequest, @Res() res: Response) {
        await this.cdGrpChangeService.createCdGrp(cdGrpRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 코드를 변경한다.
     *
     * @param cdGrpId 코드식별자
     * @param cdGrpRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Put(":cdGrpId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async update(@Param("cdGrpId") cdGrpId: string, @Body() cdGrpRequest: CdGrpRequest, @Res() res: Response) {
        await this.cdGrpChangeService.updateCdGrp(cdGrpId, cdGrpRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 코드를 삭제한다.
     *
     * @param cdGrpId 코드식별자
     * @param res 응답 데이터
     */
    @Delete(":cdGrpId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async delete(@Param("cdGrpId") cdGrpId: string, @Res() res: Response) {
        await this.cdGrpChangeService.deleteCdGrp(cdGrpId);

        res.status(HttpStatus.CREATED).send();
    }
}
