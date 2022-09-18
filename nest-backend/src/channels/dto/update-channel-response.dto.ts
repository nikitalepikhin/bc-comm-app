import { ApiProperty } from "@nestjs/swagger";

export default class UpdateChannelResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  textId: string;

  @ApiProperty({ nullable: true })
  description: string | null;
}
