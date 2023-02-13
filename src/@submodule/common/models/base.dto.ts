/**
 * 최상위 응답 DTO이다.
 *
 * @description 필수 필드는 아니지만, 대부분의 응답 DTO에서 공통적으로 사용되는 필드를 정의한다.
 */
export interface BaseDto {
  /**
   * 등록자
   */
  readonly regId?: string;
  /**
   * 등록자명
   */
  readonly regNm?: string;
  /**
   * 등록일시
   */
  readonly regDt?: Date;
  /**
   * 변경자
   */
  readonly chgId?: string;
  /**
   * 변경자명
   */
  readonly chgNm?: string;
  /**
   * 변경일시
   */
  readonly chgDt?: Date;
}
