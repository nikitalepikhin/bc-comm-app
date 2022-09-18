import { ApiProperty } from "@nestjs/swagger";

export default class DeletePostRequestDto {
  @ApiProperty()
  postUuid: string;
}
