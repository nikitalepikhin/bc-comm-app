import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export default class UpdateCommentRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  @ApiProperty()
  body: string;

  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;
}
