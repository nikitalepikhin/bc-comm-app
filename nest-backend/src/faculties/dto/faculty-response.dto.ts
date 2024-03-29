import { ApiProperty } from "@nestjs/swagger";

export default class FacultyResponseDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  addressLineOne: string;

  @ApiProperty()
  addressLineTwo: string;

  @ApiProperty()
  postalCode: string;
}
