import { ApiProperty, getSchemaPath, refs } from "@nestjs/swagger";

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
  dateCreated: Date;

  @ApiProperty()
  edited: boolean;

  @ApiProperty()
  up: number;

  @ApiProperty()
  down: number;

  @ApiProperty({ enum: [-1, 0, 1] })
  dir: number;

  @ApiProperty({ oneOf: [{ type: "array", items: { $ref: getSchemaPath(PostCommentDto) } }, { type: "boolean" }] })
  comments: PostCommentDto[] | boolean;
}
