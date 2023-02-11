import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ConfigService } from "core/config";
import { LoggerService } from "core/logger";

/**
 * 데이터베이스 로거
 */
@Injectable()
export class DatabaseLogger {
  /**
   * 디버그 모드
   */
  private debugMode: boolean = false;
  /**
   *
   */
  highlighter: any;
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
  log(queryEvent: Prisma.QueryEvent) {

    const { timestamp, query, params, duration, target } = queryEvent;
    const message = `${timestamp} ${duration}ms ${target} ${query} ${params}`;
    // console.log(message);

    this.loggerService.log(message, {});


    // if (!this.isEnabled(this.configService.get('PRISMA_LOG_NAMESPACE'))) {
    //   return;
    // }
    // {
    //   timestamp: "2023-02-11T11:43:48.639Z",
    //   query: "SELECT `nestjs`.`USER`.`USER_SEQ` FROM `nestjs`.`USER` WHERE (`nestjs`.`USER`.`USER_ID` = ? AND 1=1)",
    //   params: "[\"xxxx12311xx\"]",
    //   duration: 1,
    //   target: "quaint::connector::metrics",
    // }
    // if (!this.isEnabled(namespace)) {
    //   return;
    // }
    // 디버그 모드가 아닐때만 trim 처리
    // if (!this.debugMode) {
    //   message = message.replace(/\n/g, '').replace(/ +/g, ' ').trim();
    // }
    // switch (context?.level) {
    //   case 'error':
    //     this.loggerService.error(`\n [${namespace}] ${message}`);
    //     break;
    //   case 'warning':
    //     this.loggerService.warn(`\n [${namespace}] ${message}`);
    //     break;
    //   default:
    //     if (namespace === 'query') {
    //       this.loggerService.log(`\n ${colors.grey(`[${namespace}]`)} ${message}`);
    //     } else {
    //       this.loggerService.log(`${colors.grey(`[${namespace}]`)} ${message}`);
    //     }
    //     break;
    // }
  }
  // /**
  //  * 쿼리 로그이다.
  //  *
  //  * @param context 쿼리
  //  */
  // logQuery(context: LogContext) {
  //   if (!this.isEnabled('query')) {
  //     return;
  //   }
  //   const query = this.highlighter?.highlight(context.query) ?? context.query;
  //   let msg = query + (isUndefined(context.took) ? colors.grey(` [took ${context.took} ms]`) : '');
  //   if (this.usesReplicas && context.connection) {
  //     msg += colors.cyan(`(${context.connection.type} connection '${context.connection.name}')`);
  //   }
  //   this.log(
  //     'query',
  //     `${msg} - ${isUndefined(context.took) ? '' : colors.yellow(`[ took ${context.took.toLocaleString()}ms ]`)}
  //      ${isUndefined(context.params) ? '' : `${colors.cyan(`- Parameters: ${toJson(undefined, context.params)}`)}`}`,
  //     { level: 'info' },
  //   );
  // }
  // /**
  //  * 에러 로그이다.
  //  *
  //  * @param namespace 네임스페이스
  //  * @param message 메시지
  //  * @param context 컨텍스트
  //  */
  // error(namespace: LoggerNamespace, message: string, context?: LogContext) {
  //   const msg = `message: ${message} query: ${context.query} - ${
  //     isUndefined(context.took) ? '' : colors.yellow(`[ took ${context.took.toLocaleString()}ms ]`)
  //   }}
  //   ${isUndefined(context.params) ? '' : `${colors.cyan(`- Parameters: ${toJson(undefined, context.params)}`)}`}`;
  //   this.log(namespace, msg, { level: 'error' });
  // }
  // /**
  //  * 경고 로그이다.
  //  *
  //  * @param namespace 네임스페이스
  //  * @param message 메시지
  //  * @param context 컨텍스트
  //  */
  // warn(namespace: LoggerNamespace, message: string, context?: LogContext): void {
  //   const msg = `message: ${message} query: ${context.query} - ${
  //     isUndefined(context.took) ? '' : colors.yellow(`[ took ${context.took.toLocaleString()}ms ]`)
  //   }}
  //   ${isUndefined(context.params) ? '' : `${colors.cyan(`- Parameters: ${toJson(undefined, context.params)}`)}`}`;
  //   this.log(namespace, msg, { level: 'warning' });
  // }
  /**
   * 디버그 모드를 설정한다.
   *
   * @param debugMode 디버그 모드
   */
  setDebugMode(debugMode: boolean): void {
    if (debugMode) {
      this.loggerService.log('디버그 모드 실행', {});
    }
  }
  /**
   * 로그 활성화 여부를 설정한다.
   *
   * @param namespace 네임스페이즈
   * @returns {boolean}
   */
  isEnabled(namespace): boolean {
    return !!this.debugMode && (!Array.isArray(this.debugMode) || this.debugMode.includes(namespace));
  }
}
