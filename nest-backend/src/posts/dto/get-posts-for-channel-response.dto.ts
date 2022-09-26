import { ApiProperty } from "@nestjs/swagger";
import ChannelPostDto from "./channel-post.dto";

export default class GetPostsForChannelResponseDto {
  @ApiProperty()
  hasMore: boolean;

  @ApiProperty({ type: [ChannelPostDto] })
  posts: ChannelPostDto[];
}
