import { ApiProperty } from "@nestjs/swagger";

export default class VoteOnPostRequestDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  dir: number;
}
