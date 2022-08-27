import { ApiProperty } from "@nestjs/swagger";
import SchoolAutocompleteDto from "./school-autocomplete.dto";

export default class GetSchoolAutocompleteResponseDto {
  @ApiProperty({ name: "schools", type: [SchoolAutocompleteDto] })
  schools: SchoolAutocompleteDto[];
}
