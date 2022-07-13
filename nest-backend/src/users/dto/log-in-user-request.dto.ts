import { ApiProperty } from "@nestjs/swagger";

export default class LogInUserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
