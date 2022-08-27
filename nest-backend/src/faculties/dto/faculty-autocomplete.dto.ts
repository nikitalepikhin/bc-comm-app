import { ApiProperty } from "@nestjs/swagger";

export default class FacultyAutocompleteDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  text: string;
}
