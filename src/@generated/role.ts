import { YesOrNo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty({ type: Number })
  roleSeq: number;

  @ApiProperty({ type: String })
  roleId: string;

  @ApiProperty({ type: String })
  roleNm: string;

  @ApiProperty({ enum: YesOrNo, enumName: 'YesOrNo' })
  roleUseYn: YesOrNo;

  @ApiProperty({ type: String })
  regId: string;

  @ApiProperty({ type: String })
  regNm: string;

  @ApiProperty({ type: Date })
  regDt: Date;

  @ApiProperty({ type: String })
  chgId: string;

  @ApiProperty({ type: String })
  chgNm: string;

  @ApiProperty({ type: Date })
  chgDt: Date;
}
