import { ApiProperty } from "@nestjs/swagger";
import FeedPostDto from "./feed-post.dto";

export default class GetUserFeedResponseDto {
  @ApiProperty()
  hasMore: boolean;

  @ApiProperty()
  hasNew: boolean;

  @ApiProperty({ type: [FeedPostDto] })
  posts: FeedPostDto[];
}
