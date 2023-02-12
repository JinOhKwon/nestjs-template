import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IError } from 'common';
import { LoggerService } from 'core';
import { Response } from 'express';
import { toJson } from 'helper';

/**
 * 글로벌 에러 필터이다.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: unknown & Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let message = '요청을 처리하던 중 예상하지 못한 오류가 발생했습니다. \n 관리자에게 문의해주세요.';
    let code = 'Unknown Code';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusMessage = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];

    // 미리 정의된 예외라면..
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      statusMessage = HttpStatus[statusCode];
      const errorData = exception.getResponse();

      // 오류코드를 사용한 에러(IError)라면...
      if (!(typeof errorData === 'string')) {
        const iError = errorData as IError;
        code = iError.code;
        message = toJson(iError.message, iError.msgArgs);
      }
    // application 및 runtime(모든) 에러 정의
    } else {
      this.loggerService.error(exception, {
        context: GlobalExceptionFilter.name,
        trace: exception?.stack
      });
    }

    response.status(statusCode).json({
      error: {
        statusCode,
        statusMessage,
        message,
        code,
      },
    });
  }
}
