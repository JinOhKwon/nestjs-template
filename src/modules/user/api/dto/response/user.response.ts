import { ApiProperty } from '@nestjs/swagger';
import { YesOrNoEnum } from 'src/base/constants/yes-or-no';
import { AbstractDto } from 'src/base/dto/abstract-dto';
import { RoleResponse } from 'src/modules/role/api/dto/response/role.response';
import { User } from 'src/modules/user/entity/User';

/**
 * 사용자 응답 데이터
 */
export class UserResponse extends AbstractDto {
	/**
	 * 사용자 아이디
	 */
	@ApiProperty()
	userId: string;
	/**
	 * 사용자명
	 */
	@ApiProperty()
	userNm: string;
	/**
	 * 비밀번호
	 */
	@ApiProperty()
	userPwd: string;
	/**
	 * 연락처
	 */
	@ApiProperty()
	userPhone: string;
	/**
	 * 사용여부
	 */
	@ApiProperty()
	userUseYn: YesOrNoEnum;
	/**
	 * 역할목록
	 */
	@ApiProperty()
	roles: Array<RoleResponse>;

	/**
	 * 생성자
	 *
	 * @param user 유저
	 */
	constructor(user: User) {
		super(user);
		this.userId = user.userId;
		this.userNm = user.userNm;
		this.userPwd = user.userPwd;
		this.userPhone = user.userPhone;
		this.userUseYn = user.userUseYn;
		this.roles = user.roles;
	}
}
