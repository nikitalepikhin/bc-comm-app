import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export default class UpdateUserProfileRequestDto {
  @IsString()
  @MaxLength(128)
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @MaxLength(1024)
  @IsOptional()
  @ApiProperty({ required: false })
  bio?: string;
}
