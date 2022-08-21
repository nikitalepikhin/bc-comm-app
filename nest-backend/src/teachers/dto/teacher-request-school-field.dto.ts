import { ApiProperty } from "@nestjs/swagger";

export default class TeacherRequestSchoolFieldDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;
}
