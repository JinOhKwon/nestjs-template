import { Role } from './role';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleMappRelations {
  @ApiProperty({ type: () => Role })
  roles: Role;

  @ApiProperty({ type: () => User })
  users: User;
}
