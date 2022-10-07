import { ApiProperty } from "@nestjs/swagger";

export default class GetCommentsUnderPostParamsDto {
  @ApiProperty()
  postUuid: string;
}
