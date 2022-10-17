import { ApiProperty } from "@nestjs/swagger";

export default class VerifyUserRequestDto {
  @ApiProperty()
  approve: boolean;

  @ApiProperty({ nullable: true })
  reason?: string;

  @ApiProperty()
  verifiedUserUuid: string;

  @ApiProperty({ enum: ["TEACHER", "REPRESENTATIVE"] })
  type: "TEACHER" | "REPRESENTATIVE";
}
