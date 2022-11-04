import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class GetFacultyAutocompleteRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  schoolUuid: string;
}
