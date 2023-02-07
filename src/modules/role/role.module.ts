import { Module } from '@nestjs/common';
import { DatabaseModule } from 'core';
import { RoleController } from './api/role.controller';

/**
 * 역할 모듈
 */
@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
})
export class RoleModule {}
