import { ApiProperty } from "@nestjs/swagger";

export default class SearchChannelsQueryDto {
  @ApiProperty()
  value: string;
}
