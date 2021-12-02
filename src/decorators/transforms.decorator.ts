import { Transform, TransformFnParams } from 'class-transformer';
import { castArray, isArray, isNil, trim } from 'lodash';

/**
 * 빈공백을 제거한다.
 */
export function Trim() {
	return Transform((param: TransformFnParams) => {
		if (isArray(param.value)) {
			return param?.value.map((v) => trim(v).replace(/\s\s+/g, ' '));
		}
		return trim(param?.value ?? '').replace(/\s\s+/g, ' ');
	});
}

/**
 * string 또는 number 를 integer로 변환한다.
 */
export function ToInt() {
	return Transform((param) => parseInt(param?.value ?? 0, 10), {
		toClassOnly: true
	});
}

/**
 * 배열로 변환한다.
 */
export function ToArray(): (target: any, key: string) => void {
	return Transform(
		(value) => {
			if (isNil(value)) {
				return [];
			}
			return castArray(value);
		},
		{ toClassOnly: true }
	);
}
