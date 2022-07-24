import { ApiProperty } from "@nestjs/swagger";
import { SchoolResponseDto } from "./school-response.dto";

export default class GetSchoolsResponseDto {
  @ApiProperty({ name: "schools", type: [SchoolResponseDto] })
  schools: SchoolResponseDto[];

  @ApiProperty()
  pages: number;
}
