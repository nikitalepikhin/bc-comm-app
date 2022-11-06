import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export default class CreateRepresentativeUserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  schoolUuid: string;
}
