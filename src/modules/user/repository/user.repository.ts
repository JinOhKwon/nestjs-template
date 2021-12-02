import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user';

/**
 * 사용자 레파지토리
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
