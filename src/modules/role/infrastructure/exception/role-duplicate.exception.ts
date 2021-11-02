import { ConflictException } from "@nestjs/common";
import { IError } from "src/interfaces/IError";

/**
 * 역할 데이터 중복(`CONFLICT: 409`) 에러이다.
 */
export class RoleDuplicateException extends ConflictException {
    constructor(errData?: IError | string, ...msgArgs: Array<string> | Array<number>) {
        if (errData) {
            if (typeof errData === "string") {
                super(errData);
            }
            else {
                const iError = errData as IError;
                iError.msgArgs = msgArgs;
                super(iError);
            }
        }
    }
}
