import { Injectable } from '@nestjs/common';
import { PrismaService } from 'core';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  findAll(): Observable<any> {
    try {
      return from(this.prismaService.user.findMany()).pipe(
        mergeMap((users) => (users ? of({ users }) : EMPTY)),
        throwIfEmpty(() => new Error('NOT FOUND')),
      );
    } catch (err) {
      throw err;
    }
  }
  find(userId: string): Observable<any> {
    try {
      return from(
        this.prismaService.user.findMany({
          where: {
            userId,
          },
        }),
      ).pipe(
        mergeMap((users) => (users ? of({ users }) : EMPTY)),
        throwIfEmpty(() => new Error('NOT FOUND')),
      );
    } catch (err) {
      throw err;
    }
  }
  save(data: any): Observable<any> {
    return from(this.prismaService.user.create({ data: data.user })).pipe(
      mergeMap((users) =>
        users
          ? of({
              status: 200,
              transactionDt: Date.now(),
              errMessage: {},
            })
          : EMPTY,
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('create fial'),
          },
        }),
      ),
    );
  }
  modify(userId: string, data: any): Observable<any> {
    return from(
      this.prismaService.user.update({
        data: data.user,
        where: {
          userId: data.user.userId,
        },
      }),
    ).pipe(
      mergeMap((users) =>
        users
          ? of({
              status: 200,
              transactionDt: Date.now(),
              errMessage: {},
            })
          : EMPTY,
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('modify fail'),
          },
        }),
      ),
    );
  }
  delete(data: any): Observable<any> {
    return from(
      this.prismaService.user.delete({
        where: {
          userId: data.user.userId,
        },
      }),
    ).pipe(
      mergeMap((users) =>
        users
          ? of({
              status: 200,
              transactionDt: Date.now(),
              errMessage: {},
            })
          : EMPTY,
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('delete fial'),
          },
        }),
      ),
    );
  }
}
