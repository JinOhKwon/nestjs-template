import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isNil } from 'lodash';
import { LoggerService } from 'modules';
import moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

/**
 * 로깅 인터 셉터이다.
 */
@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  /**
   * 생성자
   *
   * @param loggerService 로거 서비스
   */
  constructor(private readonly loggerService: LoggerService) { }
  /**
   * 인터셉트
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    // this.mmmtLoggerService.log('json', { args: request.json() })
    this.loggerService.log(
      `Request - HTTP Method: [START - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
        'YYYY년 MM월 DD일  HH시mm분ss초',
      )}`,
      { context: HttpLoggingInterceptor.name }
    );

    return next.handle().pipe(
      catchError((err: any) =>
        throwError(() => {
          if (!isNil(err.response)) {
            const msg = `Code: ${err.response.code} Message: ${err.response.message}`;

            this.loggerService.error(
              `Error: HTTP Method - [ERROR - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
                'YYYY년 MM월 DD일  HH시mm분ss초',
              )} ${msg}`,
              {
                context: HttpLoggingInterceptor.name,
                trace: err.stack,
                args: err.response.msgArgs,
              }
            );
          } else {
            this.loggerService.error(err, {
              context: HttpLoggingInterceptor.name,
              trace: err.stack,
            });
          }

          return err;
        }),
      ),
      finalize(() => {
        this.loggerService.log(
          `Response - HTTP Method: [END - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
            'YYYY년 MM월 DD일  HH시mm분ss초',
          )}`,
          { context: HttpLoggingInterceptor.name }
        );
      }),
    );
  }
}
