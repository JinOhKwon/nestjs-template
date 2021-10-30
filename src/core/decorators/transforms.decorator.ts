import { Transform } from "class-transformer";
import * as _ from "lodash";

/**
 * 빈공백을 제거한다.
 */
export function Trim() {
    return Transform((value: string | string[]) => {
        if (_.isArray(value)) {
            return value.map(v => _.trim(v).replace(/\s\s+/g, " "));
        }
        return _.trim(value).replace(/\s\s+/g, " ");
    });
}

/**
 * string 또는 number 를 integer로 변환한다.
 */
export function ToInt() {
    return Transform(value => parseInt(value, 10), { toClassOnly: true });
}

/**
 * 배열로 변환한다.
 */
export function ToArray(): (target: any, key: string) => void {
    return Transform(
        value => {
            if (_.isNil(value)) {
                return [];
            }
            return _.castArray(value);
        },
        { toClassOnly: true },
    );
}
