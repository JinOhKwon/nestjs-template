import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { UserResponse } from '@submodule/api';
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
  constructor(private userService: UserService) { }

  /**
   * 전제 사용자 목록을 조회한다.
   *
   * @param userId 사용자식별자
   * @param userNm 사용자명
   * @param res 응답 데이터
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async getList(): Promise<Array<UserResponse>> {
    return await this.userService.findAll();
  }

  /**
   * 특정 사용자를 조회한다.
   *
   * @param userId 사용자식별자
   * @param res 응답 데이터
   */
  @Get(':userId')
  @HttpCode(HttpStatus.CREATED)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async get(@Param('userId') userId: string) {
    return await this.userService.find(userId);
  }

  /**
   * 신규 사용자를 등록한다.
   *
   * @param userRequest 요청 데이터
   * @param res 응답 데이터
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async create(@Body() userRequest: any) {
    await this.userService.save(userRequest);
  }

  /**
   * 특정 사용자를 변경한다.
   *
   * @param userId 사용자식별자
   * @param userRequest 요청 데이터
   * @param res 응답 데이터
   */
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async update(@Param('userId') userId: string, @Body() userRequest: any) {
    await this.userService.modify(userId, userRequest);
  }

  /**
   * 특정 사용자를 변경한다.
   *
   * @param userId 사용자식별자
   * @param userRequest 요청 데이터
   * @param res 응답 데이터
   */
  @Patch(':userId')
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async patch(@Param('userId') userId: string, @Body() userRequest: any) {
    await this.userService.modify(userId, userRequest);
  }

  /**
   * 특정 사용자를 삭제한다.
   *
   * @param userId 사용자식별자
   * @param res 응답 데이터
   */
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  // @Roles(AuthRole.ROLE_SUPER, AuthRole.ROLE_MANAGER, AuthRole.ROLE_USER)
  async delete(@Param('userId') userId: string) {
    await this.userService.delete(userId);
  }
}
