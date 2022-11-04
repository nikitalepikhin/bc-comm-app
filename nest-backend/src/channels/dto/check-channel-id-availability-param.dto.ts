import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CheckChannelIdAvailabilityParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  value: string;
}
