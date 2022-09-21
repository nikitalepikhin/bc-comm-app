import { ApiProperty } from "@nestjs/swagger";
import ChannelPostDto from "./channel-post.dto";

export default class GetPostByUuidResponseDto {
  @ApiProperty()
  post: ChannelPostDto;
}
