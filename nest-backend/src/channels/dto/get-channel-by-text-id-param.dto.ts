import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class GetChannelByTextIdParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  textId: string;
}
