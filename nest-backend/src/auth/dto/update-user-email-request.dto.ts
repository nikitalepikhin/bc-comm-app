import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class UpdateUserEmailRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  @ApiProperty()
  email: string;
}
