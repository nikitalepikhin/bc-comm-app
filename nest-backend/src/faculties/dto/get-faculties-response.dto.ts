import { ApiProperty } from "@nestjs/swagger";
import FacultyResponseDto from "./faculty-response.dto";

export default class GetFacultiesResponseDto {
  @ApiProperty({ name: "faculties", type: [FacultyResponseDto] })
  faculties: FacultyResponseDto[];

  @ApiProperty()
  pages: number;
}
