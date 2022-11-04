import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class GetCommentCommentsParamDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  commentUuid: string;
}
