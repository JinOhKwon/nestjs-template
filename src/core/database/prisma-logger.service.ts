import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoggerService } from 'core';
import { isUndefined } from 'lodash';
import moment from 'moment';
import { highlight } from 'sql-highlight';

/**
 * 데이터베이스 로거
 */
@Injectable()
export class PrismaLogger {
  /**
   * 생성자
   *
   * @param option 옵션
   */
  constructor(@Inject('LoggerService') private loggerService: LoggerService, @Inject('DebugMode') private debugMode: boolean) {
    this.debugMode = debugMode;
  }
  /**
   * 로그
   *
   * @param queryEvent 쿼리 이벤트
   */
  query(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;

    if (this.debugMode) {
      return;
    }

    this.loggerService.log('----------------- QUERY START ----------------- ', {
      context: PrismaLogger.name,
    });

    this.loggerService.log(
      `query: ${highlight(query)} - Took ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );

    this.loggerService.log('----------------- QUERY END  ----------------- ', {
      context: PrismaLogger.name,
    });
  }

  info(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;
    this.loggerService.log(
      `info: ${highlight(query)} - Took ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  warn(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;

    this.loggerService.warn(
      `warn: ${highlight(query)} - Took ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  error(queryEvent: Prisma.QueryEvent & Prisma.LogEvent): void {
    const { timestamp, query, params, duration, target, message } = queryEvent;

    if (!isUndefined(query)) {
      this.loggerService.error(
        `error: ${highlight(query)} - Took ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
        {
          context: PrismaLogger.name,
        },
      );
    } else {
      this.loggerService.error(`error: ${message} - target: ${target} -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')}`, {
        context: PrismaLogger.name,
      });
    }
  }

  /**
   * 디버그 모드를 설정한다.
   *
   * @param debugMode 디버그 모드
   */
  setDebugMode(debugMode: boolean): void {
    this.debugMode = !debugMode;
    this.loggerService.log('디버그 모드 실행');
  }
}
