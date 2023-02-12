import { ApiProperty } from '@nestjs/swagger';

export class UserRoleMapp {
  @ApiProperty({ type: Number })
  userSeq: number;

  @ApiProperty({ type: Number })
  roleSeq: number;
}
