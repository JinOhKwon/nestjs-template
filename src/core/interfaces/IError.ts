/**
 * 에러 열거형 상수 인터페이스이다.
 */
export interface IError {
    readonly code: string;
    readonly message: string;
    msgArgs?: string[] | number[];
}