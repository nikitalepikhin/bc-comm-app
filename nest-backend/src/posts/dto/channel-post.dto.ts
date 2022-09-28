import { ApiProperty } from "@nestjs/swagger";

export default class ChannelPostDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  author: string;

  @ApiProperty()
  isAuthor: boolean;

  @ApiProperty()
  edited: boolean;

  @ApiProperty()
  up: number;

  @ApiProperty()
  down: number;

  @ApiProperty({ enum: [-1, 0, 1] })
  dir: number;
}
