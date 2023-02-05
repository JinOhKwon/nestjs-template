import { Role } from 'biz/role/entity/role.entity';
import { YesOrNoEnum } from "common";

/**
 * 역할 응답데이터
 */
export class RoleResponse {
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
  constructor(role: Role) {
    this.roleId = role.roleId;
    this.roleNm = role.roleNm;
    this.roleUseYn = role.roleUseYn;
  }
}
