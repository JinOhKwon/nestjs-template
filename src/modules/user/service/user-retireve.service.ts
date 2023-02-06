import { Injectable } from '@nestjs/common';

/**
 * 사용자 조회 서비스
 */
@Injectable()
export class UserRetireveService {
  // /**
  //  * 생성자
  //  *
  //  * @param userService 유저 서비스
  //  */
  // // constructor(private readonly userService: UserService, private readonly redisCacheService: RedisCacheService) {}
  // constructor(private readonly userService: UserService) {}
  // /**
  //  * 전체 사용자 목록을 조회한다.
  //  *
  //  * @param userId 사용자식별자
  //  * @param userNm 사용자명
  //  */
  // public async getList(userId?: string, userNm?: string): Promise<Array<User>> {
  //   // const params: any = {};
  //   // if (!isUndefined(userId)) {
  //   //   params.userId = Like(`%${userId}%`);
  //   // }
  //   // if (!isUndefined(userNm)) {
  //   //   params.userNm = Like(`%${userNm}%`);
  //   // }

  //   // const cache = await this.redisCacheService.get<Array<User>>(`${UserRetireveService.name}-getList`);

  //   // if (cache) {
  //   //   return cache;
  //   // } else {
  //   const result = await this.userService.getList(userId, userNm);
  //   // await this.redisCacheService.set<Array<User>>(`${UserRetireveService.name}-getList`, result);
  //   return result;
  //   // }
  // }

  // /**
  //  * 특정 사용자를 조회한다.
  //  *
  //  * @param userId 사용자식별자
  //  */
  // public async get(userId: string): Promise<User> {
  //   const user: User = await this.userService.get(userId);

  //   if (isUndefined(user)) {
  //     throw new UserNotFoundException(UserError.USER001, userId);
  //   }

  //   return user;
  // }
}
