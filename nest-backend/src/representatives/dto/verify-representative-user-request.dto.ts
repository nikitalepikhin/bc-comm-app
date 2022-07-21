import { ApiProperty } from "@nestjs/swagger";

export default class VerifyRepresentativeUserRequestDto {
  @ApiProperty()
  approve: boolean;

  @ApiProperty()
  reason?: string;

  @ApiProperty()
  verifiedUserUuid: string;
}
