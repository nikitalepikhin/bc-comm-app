import { ApiProperty } from "@nestjs/swagger";

export default class UpdateUserEmailRequestDto {
  @ApiProperty()
  email: string;
}
