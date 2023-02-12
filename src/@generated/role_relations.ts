import { UserRoleMapp } from './user_role_mapp';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRelations {
  @ApiProperty({ isArray: true, type: () => UserRoleMapp })
  user_role_mapp: UserRoleMapp[];
}
