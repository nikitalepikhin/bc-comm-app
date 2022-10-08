import { ApiProperty } from "@nestjs/swagger";

export default class FeedPostDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  channelTextId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

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

  @ApiProperty()
  dir: number;

  @ApiProperty()
  commentsCount: number;
}
