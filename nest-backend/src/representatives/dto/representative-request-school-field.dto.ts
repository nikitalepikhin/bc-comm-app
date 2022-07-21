import { ApiProperty } from "@nestjs/swagger";

export class RepresentativeRequestSchoolFieldDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;
}
