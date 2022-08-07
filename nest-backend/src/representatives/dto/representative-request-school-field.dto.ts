import { ApiProperty } from "@nestjs/swagger";

export default class RepresentativeRequestSchoolFieldDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;
}
