import { ApiProperty } from "@nestjs/swagger";

export default class CreateChannelRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  textId: string;
}
