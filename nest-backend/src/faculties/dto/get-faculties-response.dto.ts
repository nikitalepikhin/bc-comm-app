import { ApiProperty } from "@nestjs/swagger";
import FacultyResponseDto from "./faculty-response.dto";

export default class GetFacultiesResponseDto {
  @ApiProperty({ name: "faculties", type: [FacultyResponseDto] })
  schools: FacultyResponseDto[];

  @ApiProperty()
  pages: number;
}
