import { Module } from '@nestjs/common';
import { RoleModule } from 'biz/role/role.module';
import { PrismaModule } from '../../../prisma/prisma.module';
import { UserController } from './api/user.controller';
import { UsersChangeService } from './service/user-change.service';
import { UserService } from './service/user.service';

/**
 * 사용자 모듈
 */
@Module({
  imports: [RoleModule, PrismaModule],
  controllers: [UserController],
  exports: [UserService, UsersChangeService],
  providers: [UserService, UsersChangeService],
})
export class UserModule { }
