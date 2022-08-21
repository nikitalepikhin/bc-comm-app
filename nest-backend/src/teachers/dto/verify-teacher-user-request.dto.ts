import { ApiProperty } from "@nestjs/swagger";

export default class VerifyTeacherUserRequestDto {
  @ApiProperty()
  approve: boolean;

  @ApiProperty()
  reason?: string;

  @ApiProperty()
  verifiedUserUuid: string;
}
