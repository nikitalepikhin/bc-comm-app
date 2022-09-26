import { ApiProperty } from "@nestjs/swagger";
import { PostsOrder } from "./posts-order.enum";

export default class GetPostsForChannelParamsDto {
  @ApiProperty()
  channelTextId: string;

  @ApiProperty({ enum: [...Object.values(PostsOrder)] })
  order: PostsOrder;
}
