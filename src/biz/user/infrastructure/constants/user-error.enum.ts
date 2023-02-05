import { MmtError } from "common";
export const USER_ERROR = 'UserError';

/**
 * 사용자 관련 오류 열거형 상수이다.
 */
export enum UserErrorEnum {
  USER001 = 'USER001',
  USER002 = 'USER002',
  USER003 = 'USER003',
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const UserError: Readonly<{ [key in UserErrorEnum]: MmtError }> = {
  [UserErrorEnum.USER001]: {
    name: USER_ERROR,
    code: 'USER001',
    message: '%s 은(는) 존재하지 않는 사용자입니다.',
  },
  [UserErrorEnum.USER002]: {
    name: USER_ERROR,
    code: 'USER002',
    message: '%s 와(과) 동일한 아이디가 존재합니다.',
  },
  [UserErrorEnum.USER003]: {
    name: USER_ERROR,
    code: 'USER003',
    message: '요청정보가 올바르지 않습니다.',
  },
};
