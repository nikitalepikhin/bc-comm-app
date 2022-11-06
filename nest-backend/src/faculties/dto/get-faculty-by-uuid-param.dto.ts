import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class GetFacultyByUuidParamDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;
}
