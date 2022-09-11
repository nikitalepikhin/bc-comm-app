import { ApiProperty } from "@nestjs/swagger";

export default class GetChannelByTextIdParamsDto {
  @ApiProperty()
  textId: string;
}
