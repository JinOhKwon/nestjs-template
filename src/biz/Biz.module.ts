import { Module } from '@nestjs/common';
import { RoleModule } from 'biz/role/role.module';
import { UserModule } from 'biz/user/user.module';


/**
 * app 모듈
 */
@Module({
  imports: [
    UserModule,
    RoleModule,
  ],
})
export class BizModule { }

