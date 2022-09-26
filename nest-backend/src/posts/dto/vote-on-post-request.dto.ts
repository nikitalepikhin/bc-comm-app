import { ApiProperty } from "@nestjs/swagger";

export default class VoteOnPostRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty()
  dir: number;
}
