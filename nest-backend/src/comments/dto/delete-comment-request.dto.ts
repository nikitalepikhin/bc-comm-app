import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class DeleteCommentRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;

  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;
}
