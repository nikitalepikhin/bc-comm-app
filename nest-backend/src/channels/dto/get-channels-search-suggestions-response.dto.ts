import { ApiProperty } from "@nestjs/swagger";
import ChannelsSearchSuggestionDto from "./channels-search-suggestion.dto";

export default class GetChannelsSearchSuggestionsResponseDto {
  @ApiProperty({ type: [ChannelsSearchSuggestionDto] })
  channels: ChannelsSearchSuggestionDto[];
}
