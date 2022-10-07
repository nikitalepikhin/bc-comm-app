import { ApiProperty } from "@nestjs/swagger";

export default class DeleteCommentRequestDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  postUuid: string;
}
