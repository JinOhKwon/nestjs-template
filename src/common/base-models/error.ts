/**
 * 에러 열거형 상수 인터페이스이다.
 */
export interface MmtError extends Error {
  readonly code: string;
  readonly message: string;
  msgArgs?: Array<string> | Array<number>;
}
