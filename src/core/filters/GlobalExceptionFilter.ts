import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Response } from "express";
import { IError } from "interfaces/IError";
import * as _ from "lodash";

/**
 * 글로벌 에러 필터이다.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        let message = "요청을 처리하던 중 예상하지 못한 오류가 발생했습니다.\n관리자에게 문의해주세요.";
        let code = "Unknown Code";
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let statusMessage = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];

        // 미리 정의된 예외라면..
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            statusMessage = HttpStatus[statusCode];
            const errorData = exception.getResponse();

            // 오류코드를 사용한 에러(IError)라면...
            if (!(typeof errorData === "string")) {
                const iError = errorData as IError;

                code = iError.code;
                message = iError.message;

                // 오류 메시지 인자를 치환한다.
                _.each(iError.msgArgs, (arg, idx) => {
                    message = iError.message.replace(new RegExp("\\{" + idx + "\\}", "g"), arg.toString());
                });
            }
        }

        response.status(statusCode).json({
            error: {
                statusCode,
                statusMessage,
                message,
                code,
            }
        });

        throw exception;
    }
}
