import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class GetSchoolAutocompleteRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;
}
