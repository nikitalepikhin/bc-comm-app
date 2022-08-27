import { ApiProperty } from "@nestjs/swagger";

export default class GetSchoolAutocompleteRequestDto {
  @ApiProperty()
  value: string;
}
