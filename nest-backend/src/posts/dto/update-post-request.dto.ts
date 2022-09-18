import { ApiProperty } from "@nestjs/swagger";

export default class UpdatePostRequestDto {
  @ApiProperty()
  postUuid: string;

  @ApiProperty()
  body: string;
}
