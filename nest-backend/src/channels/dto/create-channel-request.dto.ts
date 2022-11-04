import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export default class CreateChannelRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  @ApiProperty({ nullable: true })
  description?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  textId: string;
}
