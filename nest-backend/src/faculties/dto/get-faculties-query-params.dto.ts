import { ApiProperty } from "@nestjs/swagger";

export default class GetFacultiesQueryParamsDto {
  @ApiProperty()
  page: string | undefined;

  @ApiProperty()
  count: string | undefined;
}
