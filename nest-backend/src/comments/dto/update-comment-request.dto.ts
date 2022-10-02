import { ApiProperty } from "@nestjs/swagger";

export default class UpdateCommentRequestDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  body: string;
}
