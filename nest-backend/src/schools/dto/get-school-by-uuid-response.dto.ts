import { ApiProperty } from "@nestjs/swagger";

export default class GetSchoolByUuidResponseDto {
  @ApiProperty()
  uuid: string;
}
