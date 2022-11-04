import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class LogInUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  password: string;
}
