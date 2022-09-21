import { ApiProperty } from "@nestjs/swagger";

export default class RefreshUsernameResponseDto {
  @ApiProperty()
  username: string;
}
