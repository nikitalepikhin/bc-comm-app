import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export default class UpdateChannelRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  textId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  oldTextId: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  @ApiProperty({ required: false })
  description?: string;
}
