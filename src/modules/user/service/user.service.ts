import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ExludeEntity, ExludeOmit } from '@types';
import { PrismaService } from 'core';
import { concatMap, from, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Observable<Array<ExludeOmit<User, ExludeEntity | 'userSeq'>>> {
    return from(this.prismaService.user.findMany()).pipe(
      concatMap((users: Array<User>) => {
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

  find(userId: string): Observable<Array<ExludeOmit<User, ExludeEntity | 'userSeq'>>> {
    return from(
      this.prismaService.user.findMany({
        where: {
          userId,
        },
      }),
    ).pipe(concatMap((user) => of(user)));
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
