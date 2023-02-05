import { YesOrNoEnum } from "common";

/**
 * 역할 요청데이터
 */
export class RoleRequest {
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
  readonly roleUseYn: YesOrNoEnum;

  /**
   * 생성자
   *
   * @param roleId 역할 아이디
   * @param roleNm 역할명
   * @param roleUseYn 사용여부
   */
  constructor(roleId: string, roleNm: string, roleUseYn: YesOrNoEnum) {
    this.roleId = roleId;
    this.roleNm = roleNm;
    this.roleUseYn = roleUseYn;
  }
}
