import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class GetTeacherByUsernameRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;
}
