import { LoggerService as NestLoggerService, Logger as NestLogger, LogLevel } from '@nestjs/common';
import { toJson } from 'helper';
import { isUndefined } from 'lodash';

/**
 * 로그 파라미터
 */
interface LogParam {
  /**
   * 컨텍스트
   */
  context?: string;
  /**
   * 트레이스
   */
  trace?: string;
  /**
   * 아규먼트
   */
  args?: any;
}

/**
 * 모멘토 로거 서비스
 */
export class LoggerService implements NestLoggerService {
  /**
   * 로거
   */
  private logger = new NestLogger();

  /**
   * 컨텍스트
   */
  private context?: string;

  /**
   * 컨텍스트를 저장한다.
   *
   * @param context 컨텍스트
   */
  public setContext(context: string) {
    this.context = context;
  }

  /**
   * 로그를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  public log(message: string | any, LogParam: LogParam): void {
    let { context, args } = LogParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if('object' === typeof message) {
      this.existLogger(message, 'warn', context);
    }

    return this.logger.log(toJson(message, args), context, { ...args });
  }

  /**
   * 에러를 반환한다.
   *
   * @param message 메시지
   * @param trace 에러 트레이스
   * @param context 컨텍스트
   * @returns {stirng}
   */
  public error(message: any, LogParam: LogParam): void {
    let { context, trace, args } = LogParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if(message instanceof Error || 'object' === typeof message) {
      this.existLogger(message, 'error', context, trace);
    }

    return this.logger.error(
      toJson(message, args),
      { stack: [trace || message.stack] }, context
    );
  }

  /**
   * 경고를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  public warn(message: any, LogParam: LogParam): void {
    let { context, args } = LogParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if('object' === typeof message) {
      this.existLogger(message, 'warn');
    }

    return this.logger.warn(toJson(message, args), context, { ...args });
  }

  /**
   * 디버그를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  public debug?(message: any, LogParam: LogParam): void {
    let { context, args } = LogParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if('object' === typeof message) {
      this.existLogger(message, 'debug', context);
    }

    return this.logger.debug(toJson(message, args), context, { ...args });
  }

  /**
   * 상세목록을 반환한다.(운영 모드 메시지 추출?)
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  public verbose?(message: any, LogParam: LogParam): any {
    let { context, args } = LogParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if('object' === typeof message) {
      this.existLogger(message, 'verbose', context);
    }

    return this.logger.verbose(toJson(message, args), context, { ...args });
  }

  /**
   * 기존 nest moudle에 호환 되기 위한 로거이다.
   *
   * @param message 메시지
   * @param logLevel 로그레벨
   * @param context 켄텍스트
   * @param trace 트레이스
   * @returns {string}
   */
  private existLogger(message: any, logLevel: LogLevel, context?: any, trace?: any) {
    const { message: msg, ...meta } = message;

    switch (logLevel) {
      case 'log':
        return this.logger.log(msg as string, { context, ...meta });
      case 'error':
        if(message instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { message: msg, name, stack, ...meta } = message;

          return this.logger.error(msg, { context, stack: [trace || message.stack], ...meta });
        }

        if('object' === typeof message) {
          const { message: msg, ...meta } = message;

          return this.logger.error(msg as string, { context, stack: [trace], ...meta });
        }
        break;
      case 'warn':
        return this.logger.warn(msg as string, { context, ...meta });
      case 'debug':
        return this.logger.debug(msg as string, { context, ...meta });
      case 'verbose':
        return this.logger.verbose(msg as string, { context, ...meta });
    }
  }
}
