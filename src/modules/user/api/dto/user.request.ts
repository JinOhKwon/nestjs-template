import { YesOrNoEnum } from 'common';

/**
 * 사용자 요청데이터
 */
export class UserRequest {
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
  readonly userUseYn: YesOrNoEnum;
  /**
   * 역할목록
   */
  // readonly roleIds: Array<string>;

  /**
   * 생성자
   *
   * @param userId 사용자 아이디
   * @param userNm 사용자명
   * @param userPwd 비밀번호
   * @param userPhone 연락처
   * @param userUseYn 사용여부
   * @param roleIds 역할식별자목록
   */
  constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userUseYn: YesOrNoEnum) {
    // constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userUseYn: YesOrNoEnum, roleIds: Array<string>) {
    this.userId = userId;
    this.userNm = userNm;
    this.userPwd = userPwd;
    this.userPhone = userPhone;
    this.userUseYn = userUseYn;
    // this.roleIds = roleIds;
  }
}
