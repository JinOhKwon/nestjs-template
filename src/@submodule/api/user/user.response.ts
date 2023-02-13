import { YesOrNo } from '@prisma/client';
import { BaseDto } from '@submodule/common';

/**
 * 사용자 응답
 */
export interface UserResponse extends BaseDto {
  /**
   * 사용자 아이디
   */
  readonly userId: string;
  /**
   * 사용자명
   */
  readonly userNm: string;
  /**
   * 비밀번호
   */
  readonly userPwd: string;
  /**
   * 연락처
   */
  readonly userPhone: string;
  /**
   * 사용여부
   */
  readonly userUseYn: YesOrNo;
}
