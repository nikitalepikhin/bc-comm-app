import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class CreateTeacherUserDto {
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

  @ApiProperty()
  facultyUuid: string;
}
