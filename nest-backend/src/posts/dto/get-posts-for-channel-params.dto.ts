import { ApiProperty } from "@nestjs/swagger";

export default class GetPostsForChannelParamsDto {
  @ApiProperty()
  channelTextId: string;

  @ApiProperty({ required: false })
  order?: PostsOrder;
}

export type PostsOrder = "new" | "top";
