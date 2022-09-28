import { ApiProperty } from "@nestjs/swagger";

export default class VoteOnPostRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty({ enum: [-1, 0, 1] })
  dir: number;
}
