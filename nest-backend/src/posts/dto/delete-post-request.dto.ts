import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class DeletePostRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;
}
