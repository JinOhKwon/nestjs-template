import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRole } from "common/constants/AuthRole";
import { Roles } from "decorators/RolesDecorator";
import { Response } from "express";
import { JwtAuthGuard } from "guards/JwtAuthGuard";
import { RolesGuard } from "guards/RolesGuard";
import { AuthUserInterceptor } from "interceptors/AuthUserInterceptor";
import { CdDtlRetireveService } from "../service/cd-dtl-retireve.service";
import { CdDtlChangeService } from "../service/cd-dtl-change.service";
import { CdDtlResponse } from "./dto/response/cd-dtl.response";
import { CdDtlRequest } from "./dto/request/cd-dtl.request";

/**
 * 코드상세 컨트롤러이다.
 */
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags("cdDtls")
@Controller("cdGrps/:cdGrpId/cdDtls")
export class CdDtlController {
    constructor(
        private cdDtlRetireveService: CdDtlRetireveService,
        private cdDtlChangeService: CdDtlChangeService) { }

    /**
     * 전제 코드상세 목록을 조회한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param cdDtlNm 코드상세명
     * @param res 응답 데이터
     */
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: CdDtlResponse })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async getList(@Param("cdGrpId") cdGrpId: string, @Res() res: Response) {
        const cdDtlResponses: CdDtlResponse[] = await this.cdDtlRetireveService.getList(cdGrpId);

        res.status(HttpStatus.OK).send({ data: { cdDtlResponses } });
    }

    /**
     * 특정 코드상세를 조회한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param res 응답 데이터
     */
    @Get(":cdDtlId")
    @ApiResponse({ status: HttpStatus.OK, type: CdDtlResponse })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async get(@Param("cdGrpId") cdGrpId: string, @Param("cdDtlId") cdDtlId: string, @Res() res: Response) {
        const cdDtlResponse: CdDtlResponse = await this.cdDtlRetireveService.get(cdGrpId, cdDtlId);

        res.status(HttpStatus.OK).send({ data: { cdDtlResponse } });
    }

    /**
     * 신규 코드상세를 등록한다.
     *
     * @param cdDtlRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async create(@Param("cdGrpId") cdGrpId: string, @Body() cdDtlRequest: CdDtlRequest, @Res() res: Response) {
        await this.cdDtlChangeService.createCdDtl(cdGrpId, cdDtlRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 코드상세를 변경한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param cdDtlRequest 요청 데이터
     * @param res 응답 데이터
     */
    @Put(":cdDtlId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async update(@Param("cdGrpId") cdGrpId: string, @Param("cdDtlId") cdDtlId: string, @Body() cdDtlRequest: CdDtlRequest, @Res() res: Response) {
        await this.cdDtlChangeService.updateCdDtl(cdGrpId, cdDtlId, cdDtlRequest);

        res.status(HttpStatus.CREATED).send();
    }

    /**
     * 특정 코드상세를 삭제한다.
     *
     * @param cdDtlId 코드상세식별자
     * @param res 응답 데이터
     */
    @Delete(":cdDtlId")
    @ApiResponse({ status: HttpStatus.CREATED })
    @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
    public async delete(@Param("cdGrpId") cdGrpId: string, @Param("cdDtlId") cdDtlId: string, @Res() res: Response) {
        await this.cdDtlChangeService.deleteCdDtl(cdGrpId, cdDtlId);

        res.status(HttpStatus.CREATED).send();
    }
}
