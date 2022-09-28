import { ApiProperty } from "@nestjs/swagger";
import PostCommentDto from "./post-comment.dto";

export default class GetCommentsUnderPostResponseDto {
  @ApiProperty()
  hasMore: boolean;

  @ApiProperty({ type: [PostCommentDto] })
  comments: PostCommentDto[];
}
