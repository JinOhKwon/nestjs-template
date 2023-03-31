import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'core';
import { from, lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async findAll(): Promise<Array<User>> {
    return await lastValueFrom(from(this.prismaService.user.findMany()));
  }

  async find(userId: string): Promise<User> {
    return await lastValueFrom(from(
      this.prismaService.user.findUnique({
        where: {
          userId,
        },
      }),
    ));
  }

  async save(userCreateInput: Prisma.UserCreateInput): Promise<any> {
    await lastValueFrom(from(this.prismaService.user.create({ data: userCreateInput })));
  }

  async modify(userId: string, userUpdateInput: Prisma.UserUpdateInput): Promise<any> {
    await lastValueFrom(from(
      this.prismaService.user.update({
        data: userUpdateInput,
        where: {
          userId,
        },
      }),
    ));
  }

  async delete(userId: string): Promise<any> {
    await lastValueFrom(from(
      this.prismaService.user.delete({
        where: {
          userId,
        },
      }),
    ));
  }
}
