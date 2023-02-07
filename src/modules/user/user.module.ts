import { Module } from '@nestjs/common';
import { DatabaseModule } from 'core';
import { RoleModule } from 'modules/role/role.module';
import { UserController } from './api/user.controller';
import { UserService } from './service/user.service';

/**
 * 사용자 모듈
 */
@Module({
  imports: [RoleModule, DatabaseModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
