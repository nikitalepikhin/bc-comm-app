import { ApiProperty } from "@nestjs/swagger";

export default class GetPostsForChannelQueryDto {
  @ApiProperty()
  page: number;
}
