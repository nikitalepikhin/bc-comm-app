import { ApiProperty } from "@nestjs/swagger";

export default class VoteOnCommentRequestDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  dir: number;
}
