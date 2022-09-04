import { ApiProperty } from "@nestjs/swagger";

export default class GetChannelsSearchSuggestionsRequestDto {
  @ApiProperty()
  value: string;
}
