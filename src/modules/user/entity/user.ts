import { AbstractEntity } from "src/base/abstract-entity";
import { YesOrNoEnum } from "src/base/constants/yes-or-no";
import { Role } from "src/modules/role/entity/role";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserResponse } from "../api/dto/response/user.response";
import { PasswordTransformer } from "../password-transformer";

/**
 * 사용자 엔티티
 */
@Entity({ name: "tb_user" })
export class User extends AbstractEntity<UserResponse> {
    dtoClass = UserResponse;
	/**
	 * 사용자 일련번호
	 */
    @PrimaryGeneratedColumn({ name: "user_seq", type: "bigint" })
    userSeq: number;

	/**
	 * 사용자 아이디
	 */
    @Column({ name: "user_id", length: 100, unique: true })
    userId: string;

	/**
	 * 사용자명
	 */
    @Column({ name: "user_nm", length: 50 })
    userNm: string;

	/**
	 * 비밀번호
	 */
    @Column({ name: "user_pwd", length: 100, transformer: new PasswordTransformer() })
    userPwd: string;

	/**
	 * 연락처
	 */
    @Column({ name: "user_phone", length: 20 })
    userPhone: string;

	/**
	 * 사용여부
	 */
    @Column({ name: "user_use_yn", type: "enum", enum: YesOrNoEnum })
    userUseYn: YesOrNoEnum;

	/**
	 * 역할목록
	 */
    @ManyToMany(() => Role, { cascade: true, eager: true })
    @JoinTable({ name: "tb_user_role", joinColumn: { name: "user_seq" }, inverseJoinColumn: { name: "role_seq" } })
    roles: Array<Role>;

    /**
     * 생성자
     *
     * @param userId 사용자 아이디
     * @param userNm 사용자명
     * @param userPwd 비밀번호
     * @param userPhone 연락처
     * @param userUseYn 사용여부
     * @param roles 역할목록
     */
    constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userUseYn: YesOrNoEnum, roles: Array<Role>) {
        super();
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userUseYn = userUseYn;
        this.roles = roles;
    }

    /**
     * 사용자를 변경한다.
     *
     * @param userId 사용자 아이디
     * @param userNm 사용자명
     * @param userPwd 비밀번호
     * @param userPhone 연락처
     * @param userUseYn 사용여부
     * @param roles 역할목록
     */
    modifyUser = (userId: string, userNm: string, userPwd: string, userPhone: string, userUseYn: YesOrNoEnum, roles: Array<Role>): void => {
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userUseYn = userUseYn;
        this.roles = roles;
    }
}
