import { NotFoundException } from '@nestjs/common';
import { IError } from 'src/interfaces/IError';

/**
 * 사용자 데이터 없음(`NOT_FOUND: 404`) 에러이다.
 */
export class UserNotFoundException extends NotFoundException {
	constructor(
		errData?: IError | string,
		...msgArgs: Array<string> | Array<number>
	) {
		if (errData) {
			if (typeof errData === 'string') {
				super(errData);
			} else {
				const iError = errData as IError;
				iError.msgArgs = msgArgs;
				super(iError);
			}
		}
	}
}
