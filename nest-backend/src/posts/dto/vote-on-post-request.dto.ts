import { ApiProperty } from "@nestjs/swagger";

export default class VoteOnPostRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty()
  channelTextId: string;

  @ApiProperty()
  dir: number;
}
