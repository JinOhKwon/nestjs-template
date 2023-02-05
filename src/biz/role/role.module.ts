import { Module } from '@nestjs/common';
import { RoleController } from './api/role.controller';

/**
 * 역할 모듈
 */
@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  exports: [],
  providers: [],
})
export class RoleModule { }
