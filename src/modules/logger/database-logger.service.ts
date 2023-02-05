
/**
 * 데이터베이스 로거
 *
 * @description
 */
export class DatabaseLogger {
  // /**
  //  * 로거
  //  */
  // private readonly logger = new NestLogger(DatabaseLogger.name);

  // /**
  //  * 디버그 모드
  //  */
  // private readonly debugMode: boolean | Array<LoggerNamespace>;

  // /**
  //  * 하이라이트
  //  */
  // private readonly highlighter: Highlighter;

  // /**
  //  * 레플리카 사용여부
  //  */
  // private readonly usesReplicas: boolean;

  // /**
  //  * 생성자
  //  *
  //  * @param option 옵션
  //  */
  // constructor(option: LoggerOptions) {
  //   this.debugMode = option.debugMode;
  //   this.highlighter = option.highlighter;
  //   this.usesReplicas = option.usesReplicas;
  // }

  // /**
  //  * 로그
  //  *
  //  * @param level 레벨
  //  * @param message 메시지
  //  * @returns 로그 메시지
  //  */
  // log(namespace: LoggerNamespace, message: string, context?: LogContext) {
  //   if (!this.isEnabled(namespace)) {
  //     return;
  //   }

  //   // 디버그 모드가 아닐때만 trim 처리
  //   if (!this.debugMode) {
  //     message = message.replace(/\n/g, '').replace(/ +/g, ' ').trim();
  //   }

  //   switch (context?.level) {
  //     case 'error':
  //       this.logger.error(`\n [${namespace}] ${message}`);
  //       break;
  //     case 'warning':
  //       this.logger.warn(`\n [${namespace}] ${message}`);
  //       break;
  //     default:
  //       if (namespace === 'query') {
  //         this.logger.log(`\n ${colors.grey(`[${namespace}]`)} ${message}`);
  //       } else {
  //         this.logger.log(`${colors.grey(`[${namespace}]`)} ${message}`);
  //       }
  //       break;
  //   }
  // }

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

  // /**
  //  * 디버그 모드를 설정한다.
  //  *
  //  * @param debugMode 디버그 모드
  //  */
  // setDebugMode(debugMode: boolean | Array<LoggerNamespace>): void {
  //   if (debugMode) {
  //     this.logger.log('디버그 모드 실행');
  //   }
  // }

  // /**
  //  * 로그 활성화 여부를 설정한다.
  //  *
  //  * @param namespace 네임스페이즈
  //  * @returns {boolean}
  //  */
  // isEnabled(namespace: LoggerNamespace): boolean {
  //   return !!this.debugMode && (!Array.isArray(this.debugMode) || this.debugMode.includes(namespace));
  // }
}
