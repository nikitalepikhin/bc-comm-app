import { ApiProperty } from "@nestjs/swagger";
import ChannelsSearchSuggestionDto from "./channels-search-suggestion.dto";

export default class SearchChannelsResponseDto {
  @ApiProperty({ type: [ChannelsSearchSuggestionDto] })
  channels: ChannelsSearchSuggestionDto[];
}
