import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export default class CreateCommentRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  @ApiProperty()
  body: string;

  @IsOptional()
  @IsUUID("4")
  @ApiProperty({ required: false })
  parentUuid?: string;
}
