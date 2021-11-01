/**
 * 에러 열거형 상수 인터페이스이다.
 */
export interface IError {
	/**
	 * 코드
	 */
	readonly code: string;
	/**
	 * 메시지
	 */
	readonly message: string;
	/**
	 * 메시지 인자
	 */
    msgArgs?: string[] | number[];
}
