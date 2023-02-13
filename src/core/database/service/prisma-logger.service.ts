import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoggerService } from 'core/logger';
import moment from 'moment';
import { highlight } from 'sql-highlight';

/**
 * 데이터베이스 로거
 */
@Injectable()
export class PrismaLogger {
  /**
   * 디버그 모드
   */
  private debugMode = false;
  // /**
  //  * 생성자
  //  *
  //  * @param option 옵션
  //  */
  // constructor(private isDebug?: boolean, private loggerService?: LoggerService, private configService?: ConfigService) {
  //   this.debugMode = isDebug;
  // }
  /**
   * 생성자
   *
   * @param option 옵션
   */
  constructor(private loggerService?: LoggerService) {}
  /**
   * 로그
   *
   * @param level 레벨
   * @param message 메시지
   * @returns 로그 메시지
   */
  query(queryEvent: Prisma.QueryEvent) {
    const { timestamp, query, params, duration } = queryEvent;

    // 디버그 모드가 아닐때만 trim 처리
    // if (!this.debugMode) {
    //   message = message.replace(/\n/g, '').replace(/ +/g, ' ').trim();
    // }
    if (this.debugMode) {
      return;
    }

    if (query === 'BEGIN') {
      this.loggerService.log(`----------------- ${highlight(query)} ----------------- `, {
        context: PrismaLogger.name,
      });
    } else if (query === 'COMMIT') {
      this.loggerService.log(`-----------------  ${highlight(query)} ----------------- `, {
        context: PrismaLogger.name,
      });
    } else {
      this.loggerService.log(
        `
        Query: ${highlight(query)}
        - Duration ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
        {
          context: PrismaLogger.name,
        },
      );
    }
  }

  info(queryEvent: Prisma.QueryEvent) {
    const { timestamp, query, params, duration } = queryEvent;
    this.loggerService.log(
      `
        Query: ${highlight(query)}
        - Duration ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  warn(queryEvent: Prisma.QueryEvent) {
    const { timestamp, query, params, duration } = queryEvent;

    this.loggerService.warn(
      `
        Query: ${highlight(query)}
        - Duration ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  error(queryEvent: Prisma.QueryEvent) {
    const { timestamp, query, params, duration } = queryEvent;

    this.loggerService.error(
      `
        Query: ${highlight(query)}
        - Duration ${duration}ms -Time: ${moment(timestamp).format('YYYY년 MM월 DD일  HH시mm분ss초')} - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  /**
   * 디버그 모드를 설정한다.
   *
   * @param debugMode 디버그 모드
   */
  setDebugMode(debugMode: boolean): void {
    if (debugMode) {
      this.loggerService.log('디버그 모드 실행');
    }
  }
}
