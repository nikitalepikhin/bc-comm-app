import { ApiProperty } from "@nestjs/swagger";

export default class GetPostByUuidParamsDto {
  @ApiProperty()
  postUuid: string;
}
