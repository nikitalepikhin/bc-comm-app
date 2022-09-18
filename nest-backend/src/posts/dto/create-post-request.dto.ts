import { ApiProperty } from "@nestjs/swagger";

export default class CreatePostRequestDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  channelUuid: string;
}
