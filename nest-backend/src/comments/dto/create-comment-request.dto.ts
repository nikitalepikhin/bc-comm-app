import { ApiProperty } from "@nestjs/swagger";

export default class CreateCommentRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  parentUuid?: string;
}
