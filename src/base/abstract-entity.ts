import { User } from 'src/modules/user/entity/User';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { ContextProvider } from '../providers/context.provider';
import { UtilsProvider } from '../providers/utils.provider';
import { AbstractDto } from './dto/abstract-dto';

/**
 * 최상위 응답 DTO이다.
 */
export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
	/**
	 * 등록자
	 */
	@Column({ name: 'reg_id', length: 100, nullable: true })
	regId: string;
	/**
	 * 등록자명
	 */
	@Column({ name: 'reg_nm', length: 50, nullable: true })
	regNm: string;
	/**
	 * 등록일시
	 */
	@CreateDateColumn({ name: 'reg_dt', type: 'timestamp' })
	regDt: Date;
	/**
	 * 변경자
	 */
	@Column({ name: 'chg_id', length: 100, nullable: true })
	chgId: string;
	/**
	 * 변경자명
	 */
	@Column({ name: 'chg_nm', length: 50, nullable: true })
	chgNm: string;

	/**
	 * 변경일시
	 */
	@UpdateDateColumn({ name: 'chg_dt', type: 'timestamp' })
	chgDt: Date;

	/**
	 * DTO 추상 클래스
	 */
	abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

	/**
	 * DTO를 변환한다.
	 *
	 * @param options 옵션
	 * @returns DTO 변환
	 */
	toDto(options?: any) {
		return UtilsProvider.toDto(this.dtoClass, this, options);
	}

	/**
	 * DB Insert 하기전에 데이터를 등록한다.
	 */
	@BeforeInsert()
	beforeInsert = () => {
		const user = ContextProvider.get('auth') as User;
		this.regId = user.userId;
		this.regNm = user.userNm;
		this.chgId = user.userId;
		this.chgNm = user.userNm;
	};

	/**
	 * DB Update 하기전에 데이터를 변환 한다.
	 */
	@BeforeUpdate()
	beforeUpdate = () => {
		const user = ContextProvider.get('auth') as User;
		this.chgId = user.userId;
		this.chgNm = user.userNm;
	};
}
