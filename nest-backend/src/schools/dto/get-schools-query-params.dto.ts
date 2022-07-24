import { ApiProperty } from "@nestjs/swagger";

export default class GetSchoolsQueryParamsDto {
  @ApiProperty()
  page: string | undefined;

  @ApiProperty()
  count: string | undefined;
}
