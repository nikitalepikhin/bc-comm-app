import { ApiProperty } from "@nestjs/swagger";

export default class LogInUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
