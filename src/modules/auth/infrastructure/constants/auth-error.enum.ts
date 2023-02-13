import { AppError } from '@submodule/common';

export const AUTH_ERROR = 'AuthError';

/**
 * 인증 관련 오류 열거형 상수이다.
 */
export enum AuthErrorEnum {
  AUTH001 = 'AUTH001',
  AUTH002 = 'AUTH002',
  AUTH003 = 'AUTH003',
  AUTH004 = 'AUTH004',
  AUTH005 = 'AUTH005',
  AUTH006 = 'AUTH006',
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const AuthError: Readonly<{ [key in AuthErrorEnum]: AppError }> = {
  [AuthErrorEnum.AUTH001]: {
    name: AUTH_ERROR,
    code: 'AUTH001',
    message: '존재하지 않는 사용자입니다.',
  },
  [AuthErrorEnum.AUTH002]: {
    name: AUTH_ERROR,
    code: 'AUTH002',
    message: '잘못된 비밀번호입니다.',
  },
  [AuthErrorEnum.AUTH003]: {
    name: AUTH_ERROR,
    code: 'AUTH003',
    message: '허가되지 않은 접근입니다.',
  },
  [AuthErrorEnum.AUTH004]: {
    name: AUTH_ERROR,
    code: 'AUTH004',
    message: '접근할 수 있는 권한이 없습니다.',
  },
  [AuthErrorEnum.AUTH005]: {
    name: AUTH_ERROR,
    code: 'AUTH005',
    message: '인증이 만료되었습니다.\n다시 로그인 해주시기 바랍니다.',
  },
  // TODO aws 인증코드 확인 에러
  [AuthErrorEnum.AUTH006]: {
    name: AUTH_ERROR,
    code: 'AUTH006',
    message: '인증이 되지 않는 코드 입니다.',
  },
};
