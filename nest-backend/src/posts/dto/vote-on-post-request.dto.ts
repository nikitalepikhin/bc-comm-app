import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export default class VoteOnPostRequestDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([-1, 0, 1])
  @ApiProperty()
  dir: number;
}
