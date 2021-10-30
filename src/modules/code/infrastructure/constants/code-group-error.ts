import { IError } from "interfaces/IError";

/**
 * 코드그룹 관련 오류 열거형 상수이다.
 */
export enum CodeGroupErrorEnum {
    CDGRP001 = "CDGRP001",
    CDGRP002 = "CDGRP002",
}

/**
 * 열거형 상수에 해당하는 오류 코드와 메시지이다.
 */
export const CodeGroupError: Readonly<{ [key in CodeGroupErrorEnum]: IError }> = {
    [CodeGroupErrorEnum.CDGRP001]: { code: "CDGRP001", message: "[{0}]은(는) 존재하지 않는 코드그룹입니다." },
    [CodeGroupErrorEnum.CDGRP002]: { code: "CDGRP002", message: "[{0}]와(과) 동일한 코드그룹이 존재합니다." },
};