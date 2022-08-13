import { ApiProperty } from "@nestjs/swagger";

export default class DeleteFacultyDto {
  @ApiProperty()
  uuid: string;
}
