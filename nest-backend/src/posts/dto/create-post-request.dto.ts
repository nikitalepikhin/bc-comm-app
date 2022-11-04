import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export default class CreatePostRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40000)
  @ApiProperty()
  body: string;

  @IsUUID("4")
  @IsNotEmpty()
  @ApiProperty()
  channelUuid: string;
}
