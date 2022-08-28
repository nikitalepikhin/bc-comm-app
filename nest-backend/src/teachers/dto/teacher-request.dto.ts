import { ApiProperty } from "@nestjs/swagger";
import TeacherRequestSchoolFieldDto from "./teacher-request-school-field.dto";
import TeacherRequestUserFieldDto from "./teacher-request-user-field.dto";
import TeacherRequestFacultyFieldDto from "./teacher-request-faculty-field.dto";

export default class TeacherRequestDto {
  @ApiProperty()
  school: TeacherRequestSchoolFieldDto;

  @ApiProperty()
  faculty: TeacherRequestFacultyFieldDto;

  @ApiProperty()
  user: TeacherRequestUserFieldDto;
}
