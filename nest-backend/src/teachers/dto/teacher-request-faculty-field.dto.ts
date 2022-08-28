import { ApiProperty } from "@nestjs/swagger";

export default class TeacherRequestFacultyFieldDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;
}
