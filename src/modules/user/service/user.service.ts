import { Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { Equal, FindConditions } from 'typeorm';
import { User } from '../entity/user';
import { UserRepository } from '../repository/user.repository';

/**
 * 사용자 서비스
 */
@Injectable()
export class UserService {
	/**
	 * 생성자이다.
	 *
	 * @param userRepository 사용자 레파지토리
	 */
	constructor(private readonly userRepository: UserRepository) {}

	/**
	 * 전체 사용자 목록을 조회한다.
	 *
	 * @param conditions 조건
	 */
	async getList(conditions: FindConditions<User>): Promise<Array<User>> {
		return await this.userRepository.find(conditions);
	}

	/**
	 * 전체 사용자 목록을 조회한다.
	 *
	 * @param conditions 조건
	 */
	async get(conditions: FindConditions<User>): Promise<User> {
		return await this.userRepository.findOne(conditions);
	}

	/**
	 * 사용자를 등록한다.
	 *
	 * @param user 사용자
	 */
	async create(user: User): Promise<User> {
		const cUser = this.userRepository.create(user);
		return this.userRepository.save(cUser);
	}

	/**
	 * 사용자를 삭제한다.
	 *
	 * @param user 사용자
	 */
	async delete(conditions: FindConditions<User>): Promise<void> {
		this.userRepository.delete(conditions);
	}

	/**
	 * 사용자 건수를 조회한다.
	 *
	 * @param conditions 조건
	 */
	async getCount(findData: FindConditions<User>): Promise<number> {
		return await this.userRepository.count(findData);
	}

	/**
	 * 사용자가 존재하는지 확인한다.
	 *
	 * @param userId 사용자식별자
	 */
	async isDup(userId: string): Promise<boolean> {
		const user: User = await this.userRepository.findOne({
			userId: Equal(userId)
		});
		return !isUndefined(user);
	}

	/**
	 * 사용자 엔티티 트렌젝션을 save한다.
	 *
	 * @param user 사용자
	 */
	async save(user: User): Promise<void> {
		this.userRepository.save(user);
	}
}
