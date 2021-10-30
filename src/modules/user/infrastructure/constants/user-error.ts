import { IError } from "interfaces/IError";

/**
 * 사용자 관련 오류 열거형 상수이다.
 */
export enum UserErrorEnum {
    USER001 = "USER001",
    USER002 = "USER002",
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const UserError: Readonly<{ [key in UserErrorEnum]: IError }> = {
    [UserErrorEnum.USER001]: { code: "USER001", message: "[{0}]은(는) 존재하지 않는 사용자입니다." },
    [UserErrorEnum.USER002]: { code: "USER002", message: "[{0}]와(과) 동일한 아이디가 존재합니다." },
};