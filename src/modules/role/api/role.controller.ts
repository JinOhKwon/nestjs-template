import { Controller } from '@nestjs/common';
// import { AuthUserInterceptor } from 'shared/interceptors/auth-user.interceptor';

/**
 * 역할 컨트롤러이다.
 */
// @UseGuards(JwtAuthGuard, RolesGuard)
// @UseInterceptors(AuthUserInterceptor)
@Controller('roles')
export class RoleController {
  // /**
  //  * 생성자
  //  *
  //  * @param roleRetireveService 역할 조회 서비스
  //  * @param roleChangeService 역할 변경 서비스
  //  */
  // constructor(private readonly roleRetireveService: RoleRetireveService, private readonly roleChangeService: RoleChangeService) {}
  // /**
  //  * 전제 역할 목록을 조회한다.
  //  *
  //  * @param roleId 역할식별자
  //  * @param roleNm 역할명
  //  * @param res 응답 데이터
  //  */
  // @Get()
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async getList(@Res() res: Response) {
  //   const roleResponses: Array<Role> = await this.roleRetireveService.getList();
  //   res.status(HttpStatus.OK).send(roleResponses);
  // }
  // /**
  //  * 특정 역할을 조회한다.
  //  *
  //  * @param roleId 역할식별자
  //  * @param res 응답 데이터
  //  */
  // @Get(':roleId')
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async get(@Param('roleId') roleId: string, @Res() res: Response) {
  //   const roleResponse: Role = await this.roleRetireveService.get(roleId);
  //   res.status(HttpStatus.OK).send(roleResponse);
  // }
  // /**
  //  * 신규 역할을 등록한다.
  //  *
  //  * @param roleRequest 요청 데이터
  //  * @param res 응답 데이터
  //  */
  // @Post()
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async create(@Body() roleRequest: RoleRequest, @Res() res: Response) {
  //   await this.roleChangeService.createRole(roleRequest);
  //   res.status(HttpStatus.CREATED).send();
  // }
  // /**
  //  * 특정 역할을 변경한다.
  //  *
  //  * @param roleId 역할식별자
  //  * @param roleRequest 요청 데이터
  //  * @param res 응답 데이터
  //  */
  // @Put(':roleId')
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async update(@Param('roleId') roleId: string, @Body() roleRequest: RoleRequest, @Res() res: Response) {
  //   await this.roleChangeService.updateRole(roleId, roleRequest);
  //   res.status(HttpStatus.CREATED).send();
  // }
  // /**
  //  * 특정 역할을 삭제한다.
  //  *
  //  * @param roleId 역할식별자
  //  * @param res 응답 데이터
  //  */
  // @Delete(':roleId')
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async delete(@Param('roleId') roleId: string, @Res() res: Response) {
  //   await this.roleChangeService.deleteRole(roleId);
  //   res.status(HttpStatus.CREATED).send();
  // }
}
