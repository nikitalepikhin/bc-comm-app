import { ApiProperty } from "@nestjs/swagger";

export default class GetTeacherByUsernameResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  faculty: string;
}
