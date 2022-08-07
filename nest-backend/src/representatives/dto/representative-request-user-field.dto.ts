import { ApiProperty } from "@nestjs/swagger";

export default class RepresentativeRequestUserFieldDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: Date })
  created: Date;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;
}
