import { IError } from "interfaces/IError";

/**
 * 역할 관련 오류 열거형 상수이다.
 */
export enum RoleErrorEnum {
    ROLE001 = "ROLE001",
    ROLE002 = "ROLE002",
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const RoleError: Readonly<{ [key in RoleErrorEnum]: IError }> = {
    [RoleErrorEnum.ROLE001]: { code: "ROLE001", message: "[{0}]은(는) 존재하지 않는 역할입니다." },
    [RoleErrorEnum.ROLE002]: { code: "ROLE002", message: "[{0}]와(과) 동일한 아이디가 존재합니다." },
};