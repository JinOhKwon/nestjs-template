import { IError } from "interfaces/IError";

/**
 * 코드상세 관련 오류 열거형 상수이다.
 */
export enum CodeDetailErrorEnum {
    CDDTL001 = "CDDTL001",
    CDDTL002 = "CDDTL002",
    CDDTL003 = "CDDTL003",
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const CodeDetailError: Readonly<{ [key in CodeDetailErrorEnum]: IError }> = {
    [CodeDetailErrorEnum.CDDTL001]: { code: "CDDTL001", message: "[{0}]은(는) 존재하지 않는 코드상세입니다." },
    [CodeDetailErrorEnum.CDDTL002]: { code: "CDDTL002", message: "[{0}]와(과) 동일한 아이디가 존재합니다." },
    [CodeDetailErrorEnum.CDDTL003]: { code: "CDDTL003", message: "[{0}]와(과) 동일한 이름이 존재합니다." },
};