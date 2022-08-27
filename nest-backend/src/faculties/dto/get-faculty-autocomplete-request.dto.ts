import { ApiProperty } from "@nestjs/swagger";

export default class GetFacultyAutocompleteRequestDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  schoolUuid: string;
}
