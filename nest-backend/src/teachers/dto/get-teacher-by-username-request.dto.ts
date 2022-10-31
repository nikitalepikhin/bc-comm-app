import { ApiProperty } from "@nestjs/swagger";

export default class GetTeacherByUsernameRequestDto {
  @ApiProperty()
  username: string;
}
