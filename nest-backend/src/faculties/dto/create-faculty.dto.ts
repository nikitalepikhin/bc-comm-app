import { ApiProperty } from "@nestjs/swagger";

export default class CreateFacultyDto {
  @ApiProperty()
  schoolUuid: string;

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
