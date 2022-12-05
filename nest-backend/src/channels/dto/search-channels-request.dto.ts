import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class SearchChannelsRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;
}
