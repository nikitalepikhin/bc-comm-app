import { ApiProperty } from "@nestjs/swagger";
import { PostsOrder } from "./posts-order.enum";

export default class GetPostsForChannelQueryDto {
  @ApiProperty()
  page: number;

  @ApiProperty({ enum: [...Object.values(PostsOrder)] })
  order: PostsOrder;

  @ApiProperty({ type: Date })
  after: Date;
}
