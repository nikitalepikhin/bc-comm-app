import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export default class UpdatePostRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  postUuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40000)
  @ApiProperty()
  body: string;
}
