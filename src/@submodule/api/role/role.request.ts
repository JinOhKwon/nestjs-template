import { YesOrNo } from '@prisma/client';
import { BaseDto } from '@submodule/common';

/**
 * 역할 요청데이터
 */
export interface RoleRequest extends BaseDto {
  /**
   * 역할 아이디
   */
  readonly roleId: string;
  /**
   * 역할명
   */
  readonly roleNm: string;
  /**
   * 사용여부
   */
  readonly roleUseYn: YesOrNo;
}
