import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppError, toStringify } from '@submodule/common';
import { LoggerService } from 'core';
import { Response } from 'express';

/**
 * 글로벌 에러 필터이다.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly loggerService: LoggerService = new LoggerService(GlobalExceptionFilter.name);

  catch(exception: { isWrite: boolean; err: Error }, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let message = '요청을 처리하던 중 예상하지 못한 오류가 발생했습니다. \n 관리자에게 문의해주세요.';
    let code = 'Unknown Code';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusMessage = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];

    // 미리 정의된 예외라면..
    if (exception.err instanceof HttpException) {
      statusCode = exception.err.getStatus();
      statusMessage = HttpStatus[statusCode];
      const errorData = exception.err.getResponse();

      if (exception.isWrite) {
        if (!(typeof errorData === 'string')) {
          const iError = errorData as AppError;
          code = iError.code;
          message = toStringify({
            message: iError.message,
            error: iError.msgArgs,
          });
        }
      }
    } else {
      this.loggerService.error(exception.err, {
        context: GlobalExceptionFilter.name,
        trace: exception.err?.stack,
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
