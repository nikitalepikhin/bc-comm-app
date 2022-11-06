import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class GetFacultiesParamDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;
}
