import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'core';
import { EMPTY, from, mergeMap, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Observable<any> {
    return from(this.prismaService.user.findMany()).pipe(
      // TODO 여기서 resoponse 수정
      mergeMap((users) => of({ users })),
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
      mergeMap((user) => of({ user })),
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
