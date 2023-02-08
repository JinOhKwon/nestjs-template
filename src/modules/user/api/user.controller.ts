import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AuthRole } from 'common';
import { Roles } from 'decorators';
import { map } from 'rxjs';
import { UserService } from '../service/user.service';

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
   * @param userService 사용자 서비스
   */
  constructor(private userService: UserService) {}

  /**
   * 전제 사용자 목록을 조회한다.
   *
   * @param userId 사용자식별자
   * @param userNm 사용자명
   * @param res 응답 데이터
   */
  @Get()
  // @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  getList() {
    return this.userService.findAll().pipe(map((user) => ({ event: 'findAll', data: user })));
  }

  /**
   * 특정 사용자를 조회한다.
   *
   * @param userId 사용자식별자
   * @param res 응답 데이터
   */
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  get(@Param('userId') userId: string) {
    return this.userService.find(userId).pipe(map((user) => ({ event: 'findAll', data: user })));
  }

  /**
   * 신규 사용자를 등록한다.
   *
   * @param userRequest 요청 데이터
   * @param res 응답 데이터
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  create(@Body() userRequest: any) {
    this.userService.save(userRequest).pipe();
  }

  /**
   * 특정 사용자를 변경한다.
   *
   * @param userId 사용자식별자
   * @param userRequest 요청 데이터
   * @param res 응답 데이터
   */
  @Put(':userId')
  @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  update(@Param('userId') userId: string, @Body() userRequest: any) {
    return this.userService.modify(userId, userRequest);
  }

  /**
   * 특정 사용자를 삭제한다.
   *
   * @param userId 사용자식별자
   * @param res 응답 데이터
   */
  @Delete(':userId')
  @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  delete(@Param('userId') userId: string) {
    this.userService.delete(userId);
  }
}
