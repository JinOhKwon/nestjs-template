import { UserRoleMapp } from './user_role_mapp';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => UserRoleMapp })
  user_role_mapp: UserRoleMapp[];
}
