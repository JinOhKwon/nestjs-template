import { AbstractEntity } from 'common';

/**
 * 사용자 엔티티
 */
// @Entity({ tableName: 'tb_user', comment: '사용자 테이블', customRepository: () => UserRepository })
export class User extends AbstractEntity {
  // /**
  //  * 커스텀 유저 저장소
  //  */
  // // [EntityRepositoryType]?: UserRepository;

  // /**
  //  * 사용자 일련번호
  //  */
  // @PrimaryKey({ autoincrement: true, comment: '사용자 일련번호' })
  // userSeq!: number;
  // /**
  //  * 사용자 아이디
  //  */
  // @Property({ name: 'user_id', length: 100, unique: true, comment: '사용자 아이디' })
  // userId!: string;
  // /**
  //  * 사용자명
  //  */
  // @Property({ name: 'user_nm', length: 50, comment: '사용자명' })
  // userNm!: string;
  // /**
  //  * 비밀번호
  //  */
  // @Property({
  //   name: 'user_pwd',
  //   length: 100,
  //   comment: '비밀번호',
  // })
  // userPwd!: string;
  // /**
  //  * 연락처
  //  */
  // @Property({ name: 'user_phone', length: 20, comment: '연락처' })
  // userPhone!: string;
  // /**
  //  * 사용여부
  //  */
  // @Enum({
  //   items: () => YesOrNoEnum,
  //   customOrder: [YesOrNoEnum.YES, YesOrNoEnum.NO],
  //   comment: '사용 여부',
  // })
  // userUseYn!: YesOrNoEnum;

  // /**
  //  * 역할목록
  //  */
  // @ManyToMany({ type: Role, comment: '역할목록 매핑 테이블' })
  // roles = new Collection<Role>(this);

  // /**
  //  * 생성자
  //  *
  //  * @param userId 사용자 아이디
  //  * @param userNm 사용자명
  //  * @param userPwd 비밀번호
  //  * @param userPhone 연락처
  //  * @param userUseYn 사용여부
  //  * @param roles 역할목록
  //  */
  // constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userUseYn: YesOrNoEnum) {
  //   super();
  //   this.userId = userId;
  //   this.userNm = userNm;
  //   this.userPwd = userPwd;
  //   this.userPhone = userPhone;
  //   this.userUseYn = userUseYn;
  // }
}
