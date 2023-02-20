import { Logger as NestLogger, LoggerService as NestLoggerService, LogLevel } from '@nestjs/common';
import { toStringify } from '@submodule/common';
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
   * 로그 파라미터
   */
  private logParam: LogParam = {
    args: {} as any,
    context: '',
    trace: '',
  };

  /**
   * 컨텍스트를 저장한다.
   *
   * @param context 컨텍스트
   */
  setContext(context: string) {
    this.logParam.context = context;
  }

  /**
   * 로그를 반환한다.
   *
   * @param message 메시지
   * @param logParam {
   *   context?: string;
   *   trace?: string;
   *   args?: any;
   * }
   * @returns {string}
   */
  log(message: string | any, logParam?: LogParam): void {
    if (isUndefined(logParam?.context)) {
      this.logParam.context = logParam?.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'log', logParam?.context);
    }

    return this.nestLogger.log(toStringify(message, logParam?.args), logParam?.context, { ...logParam?.args });
  }

  /**
   * 에러를 반환한다.
   *
   * @param message 메시지
   * @param logParam {
   *   context?: string;
   *   trace?: string;
   *   args?: any;
   * }
   * @returns {stirng}
   */
  error(message: any, logParam?: LogParam): void {
    if (isUndefined(logParam?.context)) {
      this.logParam.context = logParam?.context;
    }

    if (message instanceof Error || typeof message === 'object') {
      return this.existLogger(message, 'error', logParam?.context, logParam?.trace);
    }

    return this.nestLogger.error(message, logParam?.context);
  }

  /**
   * 경고를 반환한다.
   *
   * @param message 메시지
   * @param logParam {
   *   context?: string;
   *   trace?: string;
   *   args?: any;
   * }
   * @returns {string}
   */
  warn(message: any, logParam?: LogParam): void {
    if (isUndefined(logParam?.context)) {
      this.logParam.context = logParam?.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'warn');
    }

    return this.nestLogger.warn(toStringify(message, logParam?.args), logParam?.context, { ...logParam?.args });
  }

  /**
   * 디버그를 반환한다.
   *
   * @param message 메시지
   * @param logParam {
   *   context?: string;
   *   trace?: string;
   *   args?: any;
   * }
   * @returns {string}
   */
  debug(message: any, logParam?: LogParam): void {
    if (isUndefined(logParam?.context)) {
      this.logParam.context = logParam?.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'debug', logParam?.context);
    }

    return this.nestLogger.debug(toStringify(message, logParam?.args), logParam?.context, { ...logParam?.args });
  }

  /**
   * 상세목록을 반환한다.(운영 모드 메시지 추출?)
   *
   * @param message 메시지
   * @param logParam {
   *   context?: string;
   *   trace?: string;
   *   args?: any;
   * }
   * @returns {string}
   */
  verbose(message: any, logParam?: LogParam): any {
    if (isUndefined(logParam?.context)) {
      this.logParam.context = logParam?.context;
    }

    if (typeof message === 'object') {
      return this.existLogger(message, 'verbose', logParam?.context);
    }

    return this.nestLogger.verbose(toStringify(message, logParam?.args), logParam?.context, { ...logParam?.args });
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
