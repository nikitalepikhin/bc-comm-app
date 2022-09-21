import { ApiProperty } from "@nestjs/swagger";

export default class CreateChannelRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty()
  textId: string;
}