import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateRepresentativeUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  name: string;

  @ApiProperty()
  schoolUuid: string;
}
