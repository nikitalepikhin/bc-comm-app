import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, ValidateIf } from "class-validator";
import { IsValidReason } from "./decorators/is-valid-reason.decorator";

enum VerifiedUserType {
  TEACHER = "TEACHER",
  REPRESENTATIVE = "REPRESENTATIVE",
}

export default class VerifyUserRequestDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  approve: boolean;

  @MaxLength(300)
  @IsValidReason("reason", {
    message: "declined verification must have a reason, approved verification must have no reason",
  })
  @ApiProperty({ nullable: true })
  reason?: string;

  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  verifiedUserUuid: string;

  @IsNotEmpty()
  @IsEnum(VerifiedUserType)
  @ApiProperty({ enum: [VerifiedUserType.TEACHER, VerifiedUserType.REPRESENTATIVE] })
  type: VerifiedUserType;
}
