import { ConflictException } from '@nestjs/common';
import { MmtError } from 'common';

/**
 * 사용자 데이터 중복(`CONFLICT: 409`) 에러이다.
 */
export class UserDuplicateException extends ConflictException {
  // eslint-disable-next-line constructor-super
  constructor(errData?: MmtError | string, ...msgArgs: Array<string> | Array<number> | any) {
    if (errData) {
      if (typeof errData === 'string') {
        super(errData);
      } else {
        const iError = errData as MmtError;
        iError.msgArgs = msgArgs;
        super(iError);
      }
    }
  }
}