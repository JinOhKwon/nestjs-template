import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserResponse } from '@submodule/api';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'core';
import { concatMap, from, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Observable<Array<UserResponse>> {
    return from(this.prismaService.user.findMany()).pipe(
      // TODO 여기서 resoponse 수정
      concatMap((users: Array<User>) => {
        const x = instanceToPlain(users);
        console.log(x);

        return of(
          users.map((user: User) => {
            return {
              userId: user.userId,
              userNm: user.userNm,
              userPwd: user.userPwd,
              userPhone: user.userPhone,
              userUseYn: user.userUseYn,
            };
          }),
        );
      }),
    );
  }

  find(userId: string): Observable<any> {
    return from(
      this.prismaService.user.findMany({
        where: {
          userId,
        },
      }),
    ).pipe(
      // TODO 여기서 resoponse 수정
      concatMap((user) => of({ user })),
    );
  }

  save(userCreateInput: Prisma.UserCreateInput): Observable<any> {
    return from(this.prismaService.user.create({ data: userCreateInput }));
  }

  modify(userId: string, userUpdateInput: Prisma.UserUpdateInput): Observable<any> {
    return from(
      this.prismaService.user.update({
        data: userUpdateInput,
        where: {
          userId,
        },
      }),
    );
  }

  delete(userId: string): Observable<any> {
    return from(
      this.prismaService.user.delete({
        where: {
          userId,
        },
      }),
    );
  }
}
