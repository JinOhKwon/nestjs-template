import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs';
import { UsersChangeService } from '../service/user-change.service';

/**
 * 사용자 컨트롤러이다.
 */
// @UseGuards(JwtAuthGuard, RolesGuard)
// @UseInterceptors(AuthUserInterceptor)
@Controller('users')
export class UserController {
  /**
   * 생성자
   *
   * @param userRetireveService 사용자 조회 서비스
   * @param userChangeService 사용자 변경 서비스
   */
  constructor(private userChangeService: UsersChangeService) { }

  /**
   * 전제 사용자 목록을 조회한다.
   *
   * @param userId 사용자식별자
   * @param userNm 사용자명
   * @param res 응답 데이터
   */
  @Get()
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  public async getList(@Query('userId') userId: string, @Query('userNm') userNm: string, @Res() res: Response) {
    return this.userChangeService
      .findAll()
      .pipe(map((user) => ({ event: 'findAll', data: user })));
  }

  // /**
  //  * 특정 사용자를 조회한다.
  //  *
  //  * @param userId 사용자식별자
  //  * @param res 응답 데이터
  //  */
  // @Get(':userId')
  // // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async get(@Param('userId') userId: string, @Res() res: Response) {
  //   const userResponse: User = await this.userRetireveService.get(userId);

  //   res.status(HttpStatus.OK).send(userResponse);
  // }

  // /**
  //  * 신규 사용자를 등록한다.
  //  *
  //  * @param userRequest 요청 데이터
  //  * @param res 응답 데이터
  //  */
  // @Post()
  // // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async create(@Body() userRequest: UserRequest, @Res() res: Response) {
  //   await this.userChangeService.createUser(userRequest);

  //   res.status(HttpStatus.CREATED).send();
  // }

  // /**
  //  * 특정 사용자를 변경한다.
  //  *
  //  * @param userId 사용자식별자
  //  * @param userRequest 요청 데이터
  //  * @param res 응답 데이터
  //  */
  // @Put(':userId')
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async update(@Param('userId') userId: string, @Body() userRequest: UserRequest, @Res() res: Response) {
  //   await this.userChangeService.updateUser(userId, userRequest);

  //   res.status(HttpStatus.CREATED).send();
  // }

  // /**
  //  * 특정 사용자를 삭제한다.
  //  *
  //  * @param userId 사용자식별자
  //  * @param res 응답 데이터
  //  */
  // @Delete(':userId')
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  // public async delete(@Param('userId') userId: string, @Res() res: Response) {
  //   await this.userChangeService.deleteUser(userId);

  //   res.status(HttpStatus.CREATED).send();
  // }
}
