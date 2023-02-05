/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class UsersChangeService {
  constructor(
    private prismaService: PrismaService,
  ) {
  }
  findAll(): Observable<any> {
    try {
      return from(this.prismaService.user.findMany()).pipe(
        mergeMap((users) => (users ? of({ users }) : EMPTY)),
        throwIfEmpty(() => new Error('NOT FOUND'))
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
            errMessage: {}
          })
          : EMPTY
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('create fial')
          }
        })
      )
    );
  }
  modify(data: any): Observable<any> {
    return from(
      this.prismaService.user.update({
        data: data.user,
        where: {
          userId: data.user.userId
        }
      })
    ).pipe(
      mergeMap((users) =>
        users
          ? of({
            status: 200,
            transactionDt: Date.now(),
            errMessage: {}
          })
          : EMPTY
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('modify fail')
          }
        })
      )
    );
  }
  delete(data: any): Observable<any> {
    return from(
      this.prismaService.user.delete({
        where: {
          userId: data.user.userId
        }
      })
    ).pipe(
      mergeMap((users) =>
        users
          ? of({
            status: 200,
            transactionDt: Date.now(),
            errMessage: {}
          })
          : EMPTY
      ),
      throwIfEmpty(() =>
        of({
          status: 500,
          transactionDt: Date.now(),
          errMessage: {
            errCode: 500,
            errMessage: new Error('delete fial')
          }
        })
      )
    );
  }
}
