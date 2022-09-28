import { ApiProperty } from "@nestjs/swagger";

export default class CreateCommentResponseDto {
  @ApiProperty()
  uuid: string;
}
