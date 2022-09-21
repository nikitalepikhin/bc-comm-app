import { ApiProperty } from "@nestjs/swagger";

export default class CreatePostResponseDto {
  @ApiProperty()
  uuid: string;
}
