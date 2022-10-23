import { ApiProperty } from "@nestjs/swagger";

export default class UpdateUserProfileRequestDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  bio?: string;
}
