import { AbstractEntity } from 'src/base/abstract-entity';
import { YesOrNoEnum } from 'src/base/constants/yes-or-no';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleResponse } from '../api/dto/response/role.response';

/**
 * 역할 엔티티
 */
@Entity({ name: 'admin_role' })
export class Role extends AbstractEntity<RoleResponse> {
	dtoClass = RoleResponse;
	/**
	 * 역할 일련번호
	 */
	@PrimaryGeneratedColumn({ name: 'role_seq', type: 'bigint' })
	roleSeq: number;

	/**
	 * 역할 아이디
	 */
	@Column({ name: 'role_id', length: 100, unique: true })
	roleId: string;

	/**
	 * 역할명
	 */
	@Column({ name: 'role_nm', length: 50 })
	roleNm: string;

	/**
	 * 사용여부
	 */
	@Column({ name: 'role_use_yn', type: 'enum', enum: YesOrNoEnum })
	roleUseYn: YesOrNoEnum;

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
	modifyRole = (
		roleId: string,
		roleNm: string,
		roleUseYn: YesOrNoEnum
	): void => {
		this.roleId = roleId;
		this.roleNm = roleNm;
		this.roleUseYn = roleUseYn;
	};
}
