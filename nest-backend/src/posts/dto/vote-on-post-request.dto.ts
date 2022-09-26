import { ApiProperty } from "@nestjs/swagger";
import { PostsOrder } from "./posts-order.enum";

export default class VoteOnPostRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty()
  channelTextId: string;

  @ApiProperty()
  dir: number;

  @ApiProperty()
  page: number;

  @ApiProperty({ enum: [...Object.values(PostsOrder)] })
  order: PostsOrder;
}
