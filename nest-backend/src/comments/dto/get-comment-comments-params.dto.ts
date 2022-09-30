import { ApiProperty } from "@nestjs/swagger";

export default class GetCommentCommentsParamsDto {
  @ApiProperty()
  commentUuid: string;
}
