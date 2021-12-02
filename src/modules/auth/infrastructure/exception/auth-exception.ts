import { UnauthorizedException } from '@nestjs/common';
import { IError } from 'src/interfaces/IError';

/**
 * 인증 실패(`UNAUTHORIZED: 401`) 예외이다.
 */
export class AuthException extends UnauthorizedException {
	constructor(
		errData?: IError | string,
		...msgArgs: Array<string> | Array<number>
	) {
		if (errData) {
			if (typeof errData === 'string') {
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
