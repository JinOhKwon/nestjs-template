import { BadRequestException } from '@nestjs/common';
import { AppError } from '@submodule/common';

/**
 * 사용자 요청(`NOT_FOUND: 404`) 에러이다.
 */
export class UserRequestException extends BadRequestException {
  // eslint-disable-next-line constructor-super
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
