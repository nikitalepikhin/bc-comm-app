import { ApiProperty } from "@nestjs/swagger";

export default class GetFacultyByUuidRequestDto {
  @ApiProperty()
  uuid: string;
}
