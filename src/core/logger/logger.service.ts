import { Logger as NestLogger, LoggerService as NestLoggerService, LogLevel } from '@nestjs/common';
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
  private nestLogger = new NestLogger();

  /**
   * 컨텍스트
   */
  private context?: string;

  /**
   * 컨텍스트를 저장한다.
   *
   * @param context 컨텍스트
   */
  setContext(context: string) {
    this.context = context;
  }

  /**
   * 로그를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  log(message: string | any, logParam?: LogParam): void {
    // eslint-disable-next-line prefer-const
    let { context, args } = logParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'log', context);
    }

    return this.nestLogger.log(toJson(message, args), context, { ...args });
  }

  /**
   * 에러를 반환한다.
   *
   * @param message 메시지
   * @param trace 에러 트레이스
   * @param context 컨텍스트
   * @param args 아규먼트
   * @returns {stirng}
   */
  error(message: any, logParam?: LogParam): void {
    // eslint-disable-next-line prefer-const
    let { context, trace } = logParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if (message instanceof Error || typeof message === 'object') {
      return this.existLogger(message, 'error', context, trace);
    }

    return this.nestLogger.error(message, message.stack, context);
  }

  /**
   * 경고를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  warn(message: any, logParam?: LogParam): void {
    // eslint-disable-next-line prefer-const
    let { context, args } = logParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'warn');
    }

    return this.nestLogger.warn(toJson(message, args), context, { ...args });
  }

  /**
   * 디버그를 반환한다.
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  debug?(message: any, logParam?: LogParam): void {
    // eslint-disable-next-line prefer-const
    let { context, args } = logParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'debug', context);
    }

    return this.nestLogger.debug(toJson(message, args), context, { ...args });
  }

  /**
   * 상세목록을 반환한다.(운영 모드 메시지 추출?)
   *
   * @param message 메시지
   * @param context 컨텍스트
   * @returns {string}
   */
  verbose?(message: any, logParam?: LogParam): any {
    // eslint-disable-next-line prefer-const
    let { context, args } = logParam;

    if (isUndefined(context)) {
      context = this.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'verbose', context);
    }

    return this.nestLogger.verbose(toJson(message, args), context, { ...args });
  }

  /**
   * 기존 nest moudle에 호환 되기 위한 로거이다.
   *
   * @param message 메시지
   * @param logLevel 로그레벨
   * @param context 켄텍스트
   * @param trace 트레이스
   * @param args 아규먼트
   * @returns {string}
   */
  private existLogger(message: any, logLevel: LogLevel, context?: any, trace?: any, ...args: any) {
    const { message: msg, ...meta } = message;

    switch (logLevel) {
      case 'log':
        return this.nestLogger.log(msg as string, { context, ...meta });
      case 'error':
        // 기본 에러 객체 핸들링
        if (message instanceof Error) {
          return this.nestLogger.error(message, message?.stack, context, ...args);
        }

        if (typeof msg === 'object') {
          const { message: msg, ...meta } = message;

          return this.nestLogger.error(msg as string, { context, stack: [trace], ...meta });
        }
        break;
      case 'warn':
        return this.nestLogger.warn(msg as string, { context, ...meta });
      case 'debug':
        return this.nestLogger.debug(msg as string, { context, ...meta });
      case 'verbose':
        return this.nestLogger.verbose(msg as string, { context, ...meta });
    }
  }
}
