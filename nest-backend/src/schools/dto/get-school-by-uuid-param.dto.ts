import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class GetSchoolByUuidParamDto {
  @IsNotEmpty()
  @IsUUID("4")
  @ApiProperty()
  uuid: string;
}
