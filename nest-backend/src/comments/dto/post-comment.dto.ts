import { ApiProperty } from "@nestjs/swagger";

export default class PostCommentDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  isAuthor: boolean;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty()
  edited: boolean;

  @ApiProperty()
  up: number;

  @ApiProperty()
  down: number;

  @ApiProperty()
  dir: number;

  @ApiProperty({ type: [PostCommentDto] })
  comments: PostCommentDto[];

  @ApiProperty()
  hasMore: boolean;

  @ApiProperty()
  level: number;

  @ApiProperty({ nullable: true })
  parentUuid: string | null;

  @ApiProperty({ nullable: true })
  rootUuid: string | null;
}
