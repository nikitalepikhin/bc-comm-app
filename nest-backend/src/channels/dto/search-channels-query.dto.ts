import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class SearchChannelsQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;
}
