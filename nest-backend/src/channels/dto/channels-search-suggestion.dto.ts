import { ApiProperty } from "@nestjs/swagger";

export default class ChannelsSearchSuggestionDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  value: string;
}
