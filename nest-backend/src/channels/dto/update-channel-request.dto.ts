import { ApiProperty } from "@nestjs/swagger";

export default class UpdateChannelRequestDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  textId: string;

  @ApiProperty()
  oldTextId: string;

  @ApiProperty({ nullable: true })
  description: string | null;
}
