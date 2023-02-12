import { YesOrNo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  userSeq: number;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  userNm: string;

  @ApiProperty({ type: String })
  userPwd: string;

  @ApiProperty({ type: String })
  userPhone: string;

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

  @ApiProperty({ enum: YesOrNo, enumName: 'YesOrNo' })
  userUseYn: YesOrNo;
}
