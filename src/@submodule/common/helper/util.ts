import { isNil } from 'lodash';

/**
 * Json 문자열로 반환한다.
 *
 * @param value 값
 * @param space 공백
 * @param args 아규먼트
 * @link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 *
 * @example ```
 *  const obj = { a: 1, b: 2, c: 3 };
 *  const json = JSON.stringify(obj);
 *  // output: {"a":1,"b":2,"c":3}
 *  console.log(json);
 * ```
 * @returns {string}
 */
export const toStringify = (value: unknown, space?: string | number, ...args: any): string => {
  /* istanbul ignore next */
  if (!isNil(value)) {
    return (value as string).replace(
      /%s/g,
      JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
    );
  }
  /* istanbul ignore next */
  return JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
};
