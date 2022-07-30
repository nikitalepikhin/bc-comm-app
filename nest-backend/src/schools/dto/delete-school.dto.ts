import { ApiProperty } from "@nestjs/swagger";

export class DeleteSchoolDto {
  @ApiProperty()
  uuid: string;
}
