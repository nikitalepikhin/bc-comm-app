import { ApiProperty } from "@nestjs/swagger";
import RepresentativeRequestSchoolFieldDto from "./representative-request-school-field.dto";
import RepresentativeRequestUserFieldDto from "./representative-request-user-field.dto";

export default class RepresentativeRequestDto {
  @ApiProperty()
  school: RepresentativeRequestSchoolFieldDto;

  @ApiProperty()
  user: RepresentativeRequestUserFieldDto;
}
