import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength, ValidateIf } from "class-validator";

enum VerifiedUserType {
  TEACHER = "TEACHER",
  REPRESENTATIVE = "REPRESENTATIVE",
}

export default class VerifyUserRequestDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  approve: boolean;

  @IsString()
  @MaxLength(300)
  @ValidateIf((object: VerifyUserRequestDto) => object.approve)
  @IsNotEmpty()
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
