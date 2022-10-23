import { ApiProperty } from "@nestjs/swagger";

export default class UpdateUserEmailResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  accessToken: string;
}
