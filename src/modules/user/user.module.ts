import { Module } from '@nestjs/common';
import { DatabaseModule } from 'core';
import { UserController } from './api/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule { }
