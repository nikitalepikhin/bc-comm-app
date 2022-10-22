import { ApiProperty } from "@nestjs/swagger";

export default class GetFacultiesQueryParamsDto {
  @ApiProperty({ required: false, type: "number" })
  page?: string;

  @ApiProperty({ required: false, type: "number" })
  count?: string;
}
