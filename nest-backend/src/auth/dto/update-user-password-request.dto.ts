import { ApiProperty } from "@nestjs/swagger";

export default class UpdateUserPasswordRequestDto {
  @ApiProperty()
  password: string;
}
