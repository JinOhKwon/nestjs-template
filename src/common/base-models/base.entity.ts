
/**
 * 최상위 응답 DTO이다.
 */
// @Entity({ abstract: true, comment: '추상화 엔티티 입니다.' })
export abstract class AbstractEntity {
  // /**
  //  * 등록자
  //  */
  // @Property({ length: 100, nullable: true, comment: '등록자' })
  // regId?: string;

  // /**
  //  * 등록자명
  //  */
  // @Property({ length: 50, nullable: true, comment: '등록자명' })
  // regNm?: string;

  // /**
  //  * 등록일시
  //  */
  // @Property({ nullable: true, comment: '등록일시', onCreate: () => new Date() })
  // regDt?: Date;

  // /**
  //  * 변경자
  //  */
  // @Property({ length: 100, nullable: true, comment: '변경자' })
  // chgId?: string;

  // /**
  //  * 변경자명
  //  */
  // @Property({ length: 50, nullable: true, comment: '변경자명' })
  // chgNm?: string;

  // /**
  //  * 변경일시
  //  */
  // @Property({ nullable: true, comment: '변경일시', onUpdate: () => new Date() })
  // chgDt?: Date;

  // /**
  //  * insert 전에 엔티티 기본속성을 추가한다.
  //  */
  // @BeforeCreate()
  // beforeInsert = async () => {
  //   // const user = ContextProvider.get('auth') as User;
  //   const user = { userId: 'system', userNm: 'system' };
  //   this.regId = user?.userId ?? 'system';
  //   this.regNm = user?.userNm ?? 'system';
  //   this.chgId = user?.userId ?? 'system';
  //   this.chgNm = user?.userNm ?? 'system';
  // };

  // /**
  //  * update 전에 엔티티 속성을 변경한다.
  //  */
  // @BeforeUpdate()
  // beforeUpdate = async () => {
  //   const user = { userId: 'system', userNm: 'system' };
  //   // const user = ContextProvider.get('auth') as User;
  //   this.chgId = user?.userId ?? 'system';
  //   this.chgNm = user?.userNm ?? 'system';
  // };
}
