import { ApiProperty } from "@nestjs/swagger";

export default class SchoolAutocompleteDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  text: string;
}
