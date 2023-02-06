import { Injectable } from '@nestjs/common';

/**
 * 사용자 서비스
 */
@Injectable()
export class UserService {
  // /**
  //  * 생성자
  //  *
  //  * @param userRepository 사용자 레파지토리
  //  */
  // constructor(private readonly userRepository: UserRepository) {}

  // /**
  //  * 전체 사용자 목록을 조회한다.
  //  *
  //  * @param conditions 조건
  //  */
  // async getList(userId?: string, userNm?: string): Promise<Array<User>> {
  //   return await this.userRepository.findAll({
  //     populateWhere: {
  //       userId,
  //       userNm,
  //     },
  //     populate: ['roles'],
  //   });
  // }

  // /**
  //  * 전체 사용자 목록을 조회한다.
  //  *
  //  * @param conditions 조건
  //  */
  // async get(userId?: string): Promise<User> {
  //   return await this.userRepository.findOneOrFail(
  //     {
  //       userId,
  //     },
  //     {
  //       populate: ['roles'],
  //     },
  //   );
  // }

  // /**
  //  * 사용자를 등록한다.
  //  *
  //  * @param user 사용자
  //  */
  // async create(user: User): Promise<void> {
  //   const cUser = this.userRepository.create(user);
  //   await this.userRepository.persistAndFlush(cUser);
  // }

  // /**
  //  * 사용자를 삭제한다.
  //  *
  //  * @param user 사용자
  //  */
  // async delete(userId: string): Promise<void> {
  //   await this.userRepository.remove({ userId });
  // }

  // /**
  //  * 사용자 건수를 조회한다.
  //  *
  //  * @param conditions 조건
  //  */
  // async getCount(findData: User): Promise<number> {
  //   return await this.userRepository.count(findData);
  // }

  // /**
  //  * 사용자가 존재하는지 확인한다.
  //  *
  //  * @param userId 사용자식별자
  //  */
  // async isDup(userId: string): Promise<boolean> {
  //   const user: User = await this.userRepository.findOne({
  //     userId,
  //   });
  //   return !isNil(user);
  // }

  // /**
  //  * 사용자 엔티티 트렌젝션을 save한다.
  //  *
  //  * @param user 사용자
  //  */
  // async save(user: User): Promise<void> {
  //   this.userRepository.persistAndFlush(user);
  // }
}
