import { AbstractEntity, YesOrNoEnum } from 'common';

/**
 * 역할 엔티티
 */
export class Role extends AbstractEntity {
  /**
   * 역할 일련번호
   */
  roleSeq!: number;

  /**
   * 역할 아이디
   */
  roleId!: string;

  /**
   * 역할명
   */
  roleNm!: string;

  /**
   * 사용여부
   */
  roleUseYn!: YesOrNoEnum;

  /**
   * 생성자
   *
   * @param roleId 역할 아이디
   * @param roleNm 역할명
   * @param roleUseYn 사용여부
   */
  constructor(roleId: string, roleNm: string, roleUseYn: YesOrNoEnum) {
    super();
    this.roleId = roleId;
    this.roleNm = roleNm;
    this.roleUseYn = roleUseYn;
  }

  /**
   * 역할을 변경한다.
   *
   * @param roleId 역할 아이디
   * @param roleNm 역할명
   * @param roleUseYn 사용여부
   */
  modifyRole = (roleId: string, roleNm: string, roleUseYn: YesOrNoEnum): void => {
    this.roleId = roleId;
    this.roleNm = roleNm;
    this.roleUseYn = roleUseYn;
  };
}
