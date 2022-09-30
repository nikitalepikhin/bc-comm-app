import { ApiProperty } from "@nestjs/swagger";
import PostCommentDto from "./post-comment.dto";

export default class GetCommentCommentsResponseDto {
  @ApiProperty({ type: [PostCommentDto] })
  comments: PostCommentDto[];
}
