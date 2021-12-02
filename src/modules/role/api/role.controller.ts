import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthRole } from 'src/base/constants/auth-role';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthUserInterceptor } from 'src/interceptors/auth-user.interceptor';
import { RoleChangeService } from '../service/role-change.service';
import { RoleRetireveService } from '../service/role-retireve.service';
import { RoleRequest } from './dto/request/role.request';
import { RoleResponse } from './dto/response/role.response';

/**
 * 역할 컨트롤러이다.
 */
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiTags('roles')
@Controller('roles')
export class RoleController {
	/**
	 * 생성자
	 *
	 * @param roleRetireveService 역할 조회 서비스
	 * @param roleChangeService 역할 변경 서비스
	 */
	constructor(
		private roleRetireveService: RoleRetireveService,
		private roleChangeService: RoleChangeService
	) {}

	/**
	 * 전제 역할 목록을 조회한다.
	 *
	 * @param roleId 역할식별자
	 * @param roleNm 역할명
	 * @param res 응답 데이터
	 */
	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: RoleResponse })
	@Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
	public async getList(@Res() res: Response) {
		const roleResponses: Array<RoleResponse> =
			await this.roleRetireveService.getList();

		res.status(HttpStatus.OK).send({ data: { roleResponses } });
	}

	/**
	 * 특정 역할을 조회한다.
	 *
	 * @param roleId 역할식별자
	 * @param res 응답 데이터
	 */
	@Get(':roleId')
	@ApiResponse({ status: HttpStatus.OK, type: RoleResponse })
	@Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
	public async get(@Param('roleId') roleId: string, @Res() res: Response) {
		const roleResponse: RoleResponse = await this.roleRetireveService.get(
			roleId
		);

		res.status(HttpStatus.OK).send({ data: { roleResponse } });
	}

	/**
	 * 신규 역할을 등록한다.
	 *
	 * @param roleRequest 요청 데이터
	 * @param res 응답 데이터
	 */
	@Post()
	@ApiResponse({ status: HttpStatus.CREATED })
	@Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
	public async create(
		@Body() roleRequest: RoleRequest,
		@Res() res: Response
	) {
		await this.roleChangeService.createRole(roleRequest);

		res.status(HttpStatus.CREATED).send();
	}

	/**
	 * 특정 역할을 변경한다.
	 *
	 * @param roleId 역할식별자
	 * @param roleRequest 요청 데이터
	 * @param res 응답 데이터
	 */
	@Put(':roleId')
	@ApiResponse({ status: HttpStatus.CREATED })
	@Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
	public async update(
		@Param('roleId') roleId: string,
		@Body() roleRequest: RoleRequest,
		@Res() res: Response
	) {
		await this.roleChangeService.updateRole(roleId, roleRequest);

		res.status(HttpStatus.CREATED).send();
	}

	/**
	 * 특정 역할을 삭제한다.
	 *
	 * @param roleId 역할식별자
	 * @param res 응답 데이터
	 */
	@Delete(':roleId')
	@ApiResponse({ status: HttpStatus.CREATED })
	@Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
	public async delete(@Param('roleId') roleId: string, @Res() res: Response) {
		await this.roleChangeService.deleteRole(roleId);

		res.status(HttpStatus.CREATED).send();
	}
}
