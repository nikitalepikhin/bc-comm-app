import { ApiProperty } from "@nestjs/swagger";

export default class DeleteSchoolDto {
  @ApiProperty()
  uuid: string;
}
