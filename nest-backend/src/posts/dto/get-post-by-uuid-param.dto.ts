import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class GetPostByUuidParamDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;
}
