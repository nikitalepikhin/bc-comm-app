import { ApiProperty } from "@nestjs/swagger";

export default class GetPostsForChannelParamsDto {
  @ApiProperty()
  channelTextId: string;
}
