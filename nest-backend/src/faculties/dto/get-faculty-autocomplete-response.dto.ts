import { ApiProperty } from "@nestjs/swagger";
import FacultyAutocompleteDto from "./faculty-autocomplete.dto";

export default class GetFacultyAutocompleteResponseDto {
  @ApiProperty({ name: "faculties", type: [FacultyAutocompleteDto] })
  faculties: FacultyAutocompleteDto[];
}
