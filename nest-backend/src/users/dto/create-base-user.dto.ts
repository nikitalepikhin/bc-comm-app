import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateBaseUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
