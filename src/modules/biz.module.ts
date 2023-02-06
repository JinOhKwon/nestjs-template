import { Module } from '@nestjs/common';
import { RoleModule } from 'modules/role/role.module';
import { UserModule } from 'modules/user/user.module';

/**
 * app 모듈
 */
@Module({
  imports: [UserModule, RoleModule],
})
export class BizModule {}
