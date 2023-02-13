/* eslint-disable constructor-super */
import { UnauthorizedException } from '@nestjs/common';
import { AppError } from '@submodule/common';

/**
 * 인증 실패(`UNAUTHORIZED: 401`) 예외이다.
 */
export class AuthException extends UnauthorizedException {
  constructor(errData?: AppError | string, ...msgArgs: Array<string> | Array<number>) {
    if (errData) {
      if (typeof errData === 'string') {
        super(errData);
      } else {
        const iError = errData as AppError;
        iError.msgArgs = msgArgs;
        super(iError);
      }
    }
  }
}
